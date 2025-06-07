import request from "supertest";
import { app, prisma } from "./setup";

describe("FarmController (e2e)", () => {
  const producerId = "d87c7643-1aaa-476c-83f8-7371464cf063";

  beforeEach(async () => {
    await prisma.farm.deleteMany();
    await prisma.producer.deleteMany();

    await prisma.producer.create({
      data: {
        id: producerId,
        name: "Maria Souza",
        document: "75438808066",
      },
    });
  });

  it("should create a farm successfully", async () => {
    const res = await request(app.getHttpServer())
      .post("/farms")
      .send({
        name: "Fazenda Alegria",
        city: "Vitória",
        state: "ES",
        totalArea: 100,
        cultivatedArea: 60,
        vegetationArea: 40,
        producerId,
      })
      .expect(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Fazenda Alegria");
    expect(res.body.city).toBe("Vitória");
    expect(res.body.state).toBe("ES");
    expect(res.body.totalArea).toBe(100);
    expect(res.body.cultivatedArea).toBe(60);
    expect(res.body.vegetationArea).toBe(40);
  });

  it("should list all farms", async () => {
    await prisma.$transaction(async (tx) => {
      const address1 = await tx.address.create({
        data: { city: "Vitória", state: "ES" },
      });

      const address2 = await tx.address.create({
        data: { city: "Vitória", state: "ES" },
      });

      await tx.farm.createMany({
        data: [
          {
            name: "Fazenda Alegria",
            totalArea: 100,
            cultivatedArea: 60,
            vegetationArea: 40,
            addressId: address1.id,
            producerId,
          },
          {
            name: "Fazenda Alvorada",
            totalArea: 100,
            cultivatedArea: 60,
            vegetationArea: 40,
            addressId: address2.id,
            producerId,
          },
        ],
      });
    });

    const res = await request(app.getHttpServer()).get("/farms").expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it("should update a farm by ID", async () => {
    const address = await prisma.address.create({
      data: { city: "Vitória", state: "ES" },
    });
    const { id } = await prisma.farm.create({
      data: {
        name: "Fazenda Alvorada",
        totalArea: 100,
        cultivatedArea: 60,
        vegetationArea: 40,
        addressId: address.id,
        producerId,
      },
    });

    const res = await request(app.getHttpServer())
      .put(`/farms/${id}`)
      .send({
        name: "Fazenda Alvorada Updated",
        city: "Vitória",
        state: "ES",
        producerId,
        totalArea: 100,
        cultivatedArea: 60,
        vegetationArea: 40,
      })
      .expect(200);

    expect(res.body).toMatchObject({});
  });
});
