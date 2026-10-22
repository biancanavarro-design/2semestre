import { NextResponse } from "next/server";
import db from "@/app/db/banco";

export async function GET() {
  try {
    const alunos = db.prepare("SELECT * FROM alunos").all();
    return NextResponse.json(alunos);
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao buscar alunos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nome, idade, serie, ra } = await request.json();
    db.prepare(
      "INSERT INTO alunos (nome, idade, serie, ra) VALUES (?, ?, ?, ?)"
    ).run(nome, idade, serie, ra);
    return NextResponse.json({ mensagem: "Aluno cadastrado com sucesso!" });
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao cadastrar aluno" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id_aluno, nome, idade, serie, ra } = await request.json();
    db.prepare(
      "UPDATE alunos SET nome = ?, idade = ?, serie = ?, ra = ? WHERE id_aluno = ?"
    ).run(nome, idade, serie, ra, id_aluno);
    return NextResponse.json({ mensagem: "Aluno atualizado com sucesso!" });
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao atualizar aluno" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id_aluno } = await request.json();
    db.prepare("DELETE FROM alunos WHERE id_aluno = ?").run(id_aluno);
    return NextResponse.json({ mensagem: "Aluno excluído com sucesso!" });
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao excluir aluno" },
      { status: 500 }
    );
  }
}