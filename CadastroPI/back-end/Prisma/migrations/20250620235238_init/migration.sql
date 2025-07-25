-- CreateTable
CREATE TABLE `usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_endereco` INTEGER NULL,
    `id_permissoes` INTEGER NOT NULL DEFAULT 3,
    `nome` VARCHAR(45) NOT NULL,
    `sobrenome` VARCHAR(45) NOT NULL,
    `nome_social` VARCHAR(45) NULL,
    `data_nasc` DATE NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `telefone` VARCHAR(45) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,
    `deleteAt` DATETIME(0) NULL,

    INDEX `fk_usuario_endereco1_idx`(`id_endereco`),
    INDEX `fk_usuario_permissoes1_idx`(`id_permissoes`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adota_cao` (
    `id_adotar` INTEGER NOT NULL,
    `cao_id_cao` INTEGER NOT NULL,
    `status_adocao` TINYINT NOT NULL,

    INDEX `fk_adota_cao_adotar1_idx`(`id_adotar`),
    INDEX `fk_adota_cao_cao1_idx`(`cao_id_cao`),
    PRIMARY KEY (`id_adotar`, `cao_id_cao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adotar` (
    `id_adotar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `data_adocao` DATE NOT NULL,
    `resultado_formulario` LONGTEXT NOT NULL,

    INDEX `fk_adotar_usuario1_idx`(`id_usuario`),
    PRIMARY KEY (`id_adotar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apadrinha_cao` (
    `id_apadrinhar` INTEGER NOT NULL,
    `id_cao` INTEGER NOT NULL,

    INDEX `fk_apadrinha_cao_apadrinhar1_idx`(`id_apadrinhar`),
    INDEX `fk_apadrinha_cao_cao1_idx`(`id_cao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apadrinhar` (
    `id_apadrinhar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `data` DATE NOT NULL,
    `dia_pagamento` DATE NOT NULL,
    `status` TINYINT NOT NULL,
    `valor_total` DECIMAL(10, 0) NOT NULL,
    `forma_pagamento` VARCHAR(45) NOT NULL,

    INDEX `fk_apadrinhar_usuario1_idx`(`id_usuario`),
    PRIMARY KEY (`id_apadrinhar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cao` (
    `id_cao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_raca` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `sexo` CHAR(1) NOT NULL,
    `idade` VARCHAR(45) NOT NULL,
    `temperamento` VARCHAR(45) NOT NULL,
    `porte` VARCHAR(45) NOT NULL,
    `pelagem` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(45) NOT NULL,
    `foto_url` VARCHAR(255) NOT NULL,
    `data_cadastro` DATE NOT NULL,
    `observacao` VARCHAR(100) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,
    `deleteAt` DATETIME(0) NULL,

    INDEX `fk_cao_raca1_idx`(`id_raca`),
    INDEX `fk_cao_usuario1_idx`(`id_usuario`),
    PRIMARY KEY (`id_cao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cao_vacina` (
    `id` INTEGER NOT NULL,
    `id_vacina` INTEGER NOT NULL,
    `id_cao` INTEGER NOT NULL,
    `data` DATE NOT NULL,
    `proxima_dose` DATE NULL,
    `observacao` LONGTEXT NULL,

    INDEX `fk_cao_vacina_cao1_idx`(`id_cao`),
    INDEX `fk_cao_vacina_vacina1_idx`(`id_vacina`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cartao_apadrinha` (
    `id_cartao` INTEGER NOT NULL,
    `id_apadrinhar` INTEGER NOT NULL,
    `valor` DECIMAL(10, 0) NOT NULL,

    INDEX `fk_cartao_apadrinha_apadrinhar1_idx`(`id_apadrinhar`),
    INDEX `fk_cartao_apadrinha_cartao_usuario1_idx`(`id_cartao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cartao_usuario` (
    `id_cartao` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `ultimos_digitos` VARCHAR(4) NOT NULL,
    `nome_titular` VARCHAR(100) NOT NULL,
    `validade_mes` VARCHAR(2) NOT NULL,
    `validade_ano` VARCHAR(4) NOT NULL,

    INDEX `fk_cartao_usuario_usuario1_idx`(`id_usuario`),
    PRIMARY KEY (`id_cartao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(100) NOT NULL,
    `bairro` VARCHAR(60) NOT NULL,
    `numero` INTEGER NOT NULL,
    `complemento` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(60) NOT NULL,
    `uf` CHAR(2) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login` (
    `id_login` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `senha` CHAR(60) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_login_usuario_idx`(`id_usuario`),
    PRIMARY KEY (`id_login`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes` (
    `id_permissoes` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,
    `adotar` TINYINT NOT NULL,
    `apadrinhar` TINYINT NOT NULL,
    `cadastrar` TINYINT NOT NULL,

    PRIMARY KEY (`id_permissoes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `raca` (
    `idraca` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idraca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacina` (
    `id_vacina` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(60) NOT NULL,
    `idadde_recomendada` VARCHAR(20) NOT NULL,
    `dose_unica` TINYINT NOT NULL,
    `intervalo_reforco` VARCHAR(20) NULL,

    PRIMARY KEY (`id_vacina`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_usuario_endereco1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco`(`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `fk_usuario_permissoes1` FOREIGN KEY (`id_permissoes`) REFERENCES `permissoes`(`id_permissoes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `adota_cao` ADD CONSTRAINT `fk_adota_cao_adotar1` FOREIGN KEY (`id_adotar`) REFERENCES `adotar`(`id_adotar`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `adota_cao` ADD CONSTRAINT `fk_adota_cao_cao1` FOREIGN KEY (`cao_id_cao`) REFERENCES `cao`(`id_cao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `adotar` ADD CONSTRAINT `fk_adotar_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `apadrinha_cao` ADD CONSTRAINT `fk_apadrinha_cao_apadrinhar1` FOREIGN KEY (`id_apadrinhar`) REFERENCES `apadrinhar`(`id_apadrinhar`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `apadrinha_cao` ADD CONSTRAINT `fk_apadrinha_cao_cao1` FOREIGN KEY (`id_cao`) REFERENCES `cao`(`id_cao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `apadrinhar` ADD CONSTRAINT `fk_apadrinhar_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cao` ADD CONSTRAINT `fk_cao_raca1` FOREIGN KEY (`id_raca`) REFERENCES `raca`(`idraca`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cao` ADD CONSTRAINT `fk_cao_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cao_vacina` ADD CONSTRAINT `fk_cao_vacina_cao1` FOREIGN KEY (`id_cao`) REFERENCES `cao`(`id_cao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cao_vacina` ADD CONSTRAINT `fk_cao_vacina_vacina1` FOREIGN KEY (`id_vacina`) REFERENCES `vacina`(`id_vacina`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cartao_apadrinha` ADD CONSTRAINT `fk_cartao_apadrinha_apadrinhar1` FOREIGN KEY (`id_apadrinhar`) REFERENCES `apadrinhar`(`id_apadrinhar`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cartao_apadrinha` ADD CONSTRAINT `fk_cartao_apadrinha_cartao_usuario1` FOREIGN KEY (`id_cartao`) REFERENCES `cartao_usuario`(`id_cartao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cartao_usuario` ADD CONSTRAINT `fk_cartao_usuario_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `fk_login_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
