import { NextResponse } from "next/server";
import db from "@/app/db/banco";

export async function GET() {
  try {
    const notas = db
      .prepare(
        `SELECT notas.id_nota, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3,
                alunos.id_aluno, alunos.nome, alunos.ra
         FROM notas
         INNER JOIN alunos ON notas.id_aluno = alunos.id_aluno
         ORDER BY alunos.nome`
      )
      .all();
    return NextResponse.json(notas);
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao buscar notas" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { id_aluno, t1, t2, n1, n2, n3 } = await request.json();
    db.prepare(
      "INSERT INTO notas (id_aluno, t1, t2, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(id_aluno, t1, t2, n1, n2, n3);
    return NextResponse.json({ mensagem: "Nota cadastrada com sucesso!" });
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao cadastrar nota" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id_nota, t1, t2, n1, n2, n3 } = await request.json();
    db.prepare(
      "UPDATE notas SET t1 = ?, t2 = ?, n1 = ?, n2 = ?, n3 = ? WHERE id_nota = ?"
    ).run(t1, t2, n1, n2, n3, id_nota);
    return NextResponse.json({ mensagem: "Nota atualizada com sucesso!" });
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao atualizar nota" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id_nota } = await request.json();
    db.prepare("DELETE FROM notas WHERE id_nota = ?").run(id_nota);
    return NextResponse.json({ mensagem: "Nota excluída com sucesso!" });
  } catch (erro) {
    return NextResponse.json(
      { erro: "Erro ao excluir nota" },
      { status: 500 }
    );
  }
}
