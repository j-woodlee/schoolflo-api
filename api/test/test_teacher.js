import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;
import bcrypt from "bcrypt-nodejs";



describe("Testing the teacher endpoints:", () => {
    it("It should create a teacher", (done) => {
        const teacher = {
            id:1,
            email: "teacher@teacher.com",
            password_hash: "12jasdlfkj2f",
            school_id: 1
        };

        chai.request(app)
            .post("/api/v1/teachers")
            .set("Accept", "application/json")
            .send(teacher)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data).to.include({
                    id: 1,
                    email: teacher.email,
                    school_id: teacher.school_id
                });
                done();
            });
    });

    it("It should not create a teacher with incomplete parameters", (done) => {
        const teacher = {
            email: "teacher@teacher.com"
        };
        chai.request(app)
            .post("/api/v1/teachers")
            .set("Accept", "application/json")
            .send(teacher)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("It should get all teachers", (done) => {
        chai.request(app)
            .get("/api/v1/teachers")
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data[0].should.have.property("id");
                res.body.data[0].should.have.property("email");
                res.body.data[0].should.have.property("password_hash");
                res.body.data[0].should.have.property("school_id");
                done();
            });
    });

    it("It should get a particular teacher", (done) => {
        const teacherId = 1;
        chai.request(app)
            .get(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data.should.have.property("id");
                res.body.data.should.have.property("email");
                res.body.data.should.have.property("password_hash");
                res.body.data.should.have.property("school_id");
                done();
            });
    });

    it("It should not get a particular teacher with invalid id", (done) => {
        const teacherId = 8888;
        chai.request(app)
            .get(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property("message")
                    .eql(`Cannot find teacher with the id ${teacherId}`);
                done();
            });
    });

    it("It should not get a particular teacher with non-numeric id", (done) => {
        const teacherId = "aaa";
        chai.request(app)
            .get(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property("message")
                    .eql("Please input a valid numeric value");
                done();
            });
    });

    it("It should update a teacher", (done) => {
        const teacherId = 1;
        const updatedTeacher = {
            id: teacherId,
            email: "teacher@email.com",
            school_id: 1,
            password_hash: "jhfhjgfh"
        };
        chai.request(app)
            .put(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .send(updatedTeacher)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.id).equal(updatedTeacher.id);
                expect(res.body.data.email).equal(updatedTeacher.email);
                expect(res.body.data.school_id).equal(updatedTeacher.school_id);
                expect(res.body.data.password_hash).equal(updatedTeacher.password_hash);
                done();
            });
    });

    it("It should not update a teacher with invalid id", (done) => {
        const teacherId = "9999";
        const updatedTeacher = {
            id: teacherId,
            email: "teacher@email.com",
            school_id: "69",
            password_hash: "jhfhjgfh"
        };
        chai.request(app)
            .put(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .send(updatedTeacher)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property("message")
                    .eql(`Cannot find teacher with the id: ${teacherId}`);
                done();
            });
    });

    it("It should not update a teacher with non-numeric id value", (done) => {
        const teacherId = "ggg";
        const updatedTeacher = {
            id: teacherId,
            email: "teacher@email.com",
            school_id: "69",
            password_hash: "jhfhjgfh"
        };
        chai.request(app)
            .put(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .send(updatedTeacher)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property("message")
                    .eql("Please input a valid numeric value");
                done();
            });
    });


    it("It should delete a teacher", (done) => {
        const teacherId = 1;
        chai.request(app)
            .delete(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.include({});
                done();
            });
    });

    it("It should not delete a teacher with invalid id", (done) => {
        const teacherId = 777;
        chai.request(app)
            .delete(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property("message")
                    .eql(`Teacher with the id ${teacherId} cannot be found`);
                done();
            });
    });

    it("It should not delete a teacher with non-numeric id", (done) => {
        const teacherId = "bbb";
        chai.request(app)
            .delete(`/api/v1/teachers/${teacherId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property("message").eql("Please provide a numeric value");
                done();
            });
    });

    it("It should successfully login a teacher with proper credentials", (done) => {
        const teacher = {
            email: "teacher@teacher.com",
            password_hash: "12jasdlfkj2f",
        };
        chai.request(app)
            .post(`/api/v1/teachers/signin`)
            .set("Accept", "application/json")
            .send(teacher)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
});
