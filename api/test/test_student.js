import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;



// need to create a school in order to make students
describe("Creating school for student testing", () => {
  it("It should create a school", (done) => {
      const school = {
          school_district: "Acalanes Union High School",
          name: "Miramonte"
      };
      chai.request(app)
          .post("/api/v1/schools")
          .set("Accept", "application/json")
          .send(school)
          .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body.data).to.include({
                  id: 1,
                  name: school.name,
                  school_district: school.school_district,
              });
              done();
          });
  });
});


describe("Testing the student endpoints:", () => {
    it("It should create a student, a school must exist", (done) => {
        const student = {
            name: "Jake",
            guardian_email: "mom@email.com",
            student_id: "69420"
        };
        chai.request(app)
            .post("/api/v1/students")
            .set("Accept", "application/json")
            .send(student)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data).to.include({
                    id: 1,
                    name: student.name,
                    guardian_email: student.guardian_email,
                    student_id: student.student_id
                });
                done();
            });
    });

    it("It should not create a student with incomplete parameters", (done) => {
        const student = {
            name: "Joe",
            guardian_email: "dad@email.com"
        };
        chai.request(app)
            .post("/api/v1/students")
            .set("Accept", "application/json")
            .send(student)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("It should get all students", (done) => {
        chai.request(app)
            .get("/api/v1/students")
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data[0].should.have.property("id");
                res.body.data[0].should.have.property("name");
                res.body.data[0].should.have.property("guardian_email");
                res.body.data[0].should.have.property("student_id");
                done();
            });
    });

    it("It should get a particular student", (done) => {
        const studentId = 1;
        chai.request(app)
            .get(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data.should.have.property("id");
                res.body.data.should.have.property("name");
                res.body.data.should.have.property("guardian_email");
                res.body.data.should.have.property("student_id");
                done();
            });
    });

    it("It should not get a particular student with invalid id", (done) => {
        const studentId = 8888;
        chai.request(app)
            .get(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property("message")
                    .eql(`Cannot find student with the id ${studentId}`);
                done();
            });
    });

    it("It should not get a particular student with non-numeric id", (done) => {
        const studentId = "aaa";
        chai.request(app)
            .get(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property("message")
                    .eql("Please input a valid numeric value");
                done();
            });
    });

    it("It should update a student", (done) => {
        const studentId = 1;
        const updatedStudent = {
            id: studentId,
            name: "Bob",
            guardian_email: "bob_dad@email.com",
            student_id: "69"
        };
        chai.request(app)
            .put(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .send(updatedStudent)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.id).equal(updatedStudent.id);
                expect(res.body.data.name).equal(updatedStudent.name);
                expect(res.body.data.guardian_email).equal(updatedStudent.guardian_email);
                expect(res.body.data.student_id).equal(updatedStudent.student_id);
                done();
            });
    });

    it("It should not update a student with invalid id", (done) => {
        const studentId = "9999";
        const updatedStudent = {
            id: studentId,
            name: "Billy Bob",
            guardian_email: "gayboi@gmail.com",
            student_id: "123456"
        };
        chai.request(app)
            .put(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .send(updatedStudent)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property("message")
                    .eql(`Cannot find student with the id: ${studentId}`);
                done();
            });
    });

    it("It should not update a student with non-numeric id value", (done) => {
        const studentId = "ggg";
        const updatedStudent = {
            id: studentId,
            name: "Billy Joe",
            guardian_email: "new_email@hotmail.com",
            student_id: "updated ID"
        };
        chai.request(app)
            .put(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .send(updatedStudent)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property("message")
                    .eql("Please input a valid numeric value");
                done();
            });
    });


    it("It should delete a student", (done) => {
        const studentId = 1;
        chai.request(app)
            .delete(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.include({});
                done();
            });
    });

    it("It should not delete a student with invalid id", (done) => {
        const studentId = 777;
        chai.request(app)
            .delete(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property("message")
                    .eql(`Student with the id ${studentId} cannot be found`);
                done();
            });
    });

    it("It should not delete a student with non-numeric id", (done) => {
        const studentId = "bbb";
        chai.request(app)
            .delete(`/api/v1/students/${studentId}`)
            .set("Accept", "application/json")
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property("message").eql("Please provide a numeric value");
                done();
            });
    });
});
