import request from "supertest";
import { app, prisma } from "./setup";

describe("Dashboard (e2e)", () => {
  beforeAll(async () => {
    const address = await prisma.address.create({
      data: { city: "Vitória", state: "ES" },
    });

    const producer = await prisma.producer.create({
      data: { name: "José", document: "75928338082" },
    });

    await prisma.farm.create({
      data: {
        name: "Fazenda Alegria",
        totalArea: 100,
        cultivatedArea: 60,
        vegetationArea: 40,
        addressId: address.id,
        producerId: producer.id,
      },
    });
  });

  it("deve retornar os dados do dashboard corretamente", async () => {
    const res = await request(app.getHttpServer())
      .get("/dashboard")
      .expect(200);

    expect(res.body).toEqual({
      totalFarms: 1,
      totalHectares: 100,
      farmsByState: [{ state: "ES", count: 1 }],
      farmsByCulture: [],
      landUse: [
        { type: "agricultavel", total: 60 },
        { type: "vegetacao", total: 40 },
      ],
    });
  });
});
