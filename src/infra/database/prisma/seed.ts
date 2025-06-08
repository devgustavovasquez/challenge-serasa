import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.crop.deleteMany();
  await prisma.harvest.deleteMany();
  await prisma.farm.deleteMany();
  await prisma.address.deleteMany();
  await prisma.producer.deleteMany();

  const createdProducers = await Promise.all([
    prisma.producer.create({
      data: {
        name: "João da Silva",
        document: "59544491040",
      },
    }),
    prisma.producer.create({
      data: {
        name: "Mimosas Fazendas LTDA",
        document: "00655337000137",
      },
    }),
  ]);

  for (const [index, producer] of createdProducers.entries()) {
    for (let i = 1; i <= 2; i++) {
      const farm = await prisma.farm.create({
        data: {
          name: `Fazenda ${index + 1}-${i}`,
          totalArea: 100 + i * 10,
          cultivatedArea: 60 + i * 5,
          vegetationArea: 40 + i * 5,

          producer: {
            connect: { id: producer.id },
          },
          address: {
            create: {
              city: `Cidade ${i}`,
              state: "ES",
            },
          },
          Harvest: {
            create: [
              {
                year: 2023,
                Crop: {
                  create: [
                    {
                      name: "Milho",
                      slug: `milho-${index + 1}-${i}-2023`,
                      production: 30 + i,
                    },
                    {
                      name: "Soja",
                      slug: `soja-${index + 1}-${i}-2023`,
                      production: 45 + i,
                    },
                  ],
                },
              },
              {
                year: 2024,
                Crop: {
                  create: [
                    {
                      name: "Café",
                      slug: `cafe-${index + 1}-${i}-2024`,
                      production: 25 + i,
                    },
                    {
                      name: "Trigo",
                      slug: `trigo-${index + 1}-${i}-2024`,
                      production: 20 + i,
                    },
                  ],
                },
              },
            ],
          },
        },
      });

      console.log(`✅ Criada: ${farm.name} para ${producer.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
