import request from "supertest";
import { app, prisma } from "./setup";

describe("ProducerController (e2e)", () => {
  beforeEach(async () => {
    await prisma.farm.deleteMany();
    await prisma.producer.deleteMany();
  });

  it("should create a producer successfully", async () => {
    const res = await request(app.getHttpServer())
      .post("/producers")
      .send({
        name: "Maria Souza",
        document: "41402636016",
      })
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Maria Souza");
    expect(res.body.document).toBe("41402636016");
  });

  it("should list all producers", async () => {
    await prisma.producer.createMany({
      data: [
        { name: "João da Silva", document: "41402636016" },
        { name: "Ana Oliveira", document: "32450895000152" },
      ],
    });

    const res = await request(app.getHttpServer())
      .get("/producers")
      .expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it("should return producer details by ID", async () => {
    const { id } = await prisma.producer.create({
      data: { name: "Carlos Lima", document: "41402636016" },
    });

    const res = await request(app.getHttpServer())
      .get(`/producers/${id}`)
      .expect(200);

    expect(res.body).toMatchObject({
      id,
      name: "Carlos Lima",
      document: "41402636016",
    });
  });

  it("should update a producer by ID", async () => {
    const { id } = await prisma.producer.create({
      data: { name: "Lucia Nunes", document: "41402636016" },
    });

    const res = await request(app.getHttpServer())
      .put(`/producers/${id}`)
      .send({ name: "Lucia Updated", document: "32450895000152" })
      .expect(200);

    expect(res.body).toMatchObject({});
  });

  it("should delete a producer by ID", async () => {
    const { id } = await prisma.producer.create({
      data: { name: "Pedro Ramos", document: "41402636016" },
    });

    await request(app.getHttpServer()).delete(`/producers/${id}`).expect(200);

    const deleted = await prisma.producer.findUnique({ where: { id } });
    expect(deleted).toBeNull();
  });
});
