# Entidades

Produtor
Fazenda
Safra
Cultura

# Relações

Produtor tem 0..* Fazenda
Fazenda tem 0..* Safra
Fazenda tem 1..1 Produtor
Safra tem 0..* Cultura

# Regras de Negócio

Área de Vegetação + Área Agricultável = Área Total;

# Objectos de Valor

CPF
Área
Endereço