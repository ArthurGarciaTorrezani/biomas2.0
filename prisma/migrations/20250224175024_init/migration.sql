-- CreateTable
CREATE TABLE "Biomas" (
    "bioma_id" SERIAL NOT NULL,
    "nome" VARCHAR(45) NOT NULL,
    "definicao" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Biomas_pkey" PRIMARY KEY ("bioma_id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "usuario_id" SERIAL NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "post_id" SERIAL NOT NULL,
    "titulo" VARCHAR(50) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "bioma_id" INTEGER,
    "usuario_id" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "Comentarios" (
    "comentario_id" SERIAL NOT NULL,
    "titulo" VARCHAR(50) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "comentario_pai_id" INTEGER,
    "post_id" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comentarios_pkey" PRIMARY KEY ("comentario_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_bioma_id_fkey" FOREIGN KEY ("bioma_id") REFERENCES "Biomas"("bioma_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_comentario_pai_id_fkey" FOREIGN KEY ("comentario_pai_id") REFERENCES "Comentarios"("comentario_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
