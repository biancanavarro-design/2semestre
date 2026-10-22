'use client';

import { useState, useEffect } from "react";
import Header from "../components/header";
import styles from "./cadnota.module.css";
import { useRouter } from "next/navigation";

export default function CadNota() {
    const [id_aluno, setIdAluno] = useState('');
    const [t1, setT1] = useState('');
    const [t2, setT2] = useState('');
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [n3, setN3] = useState('');
    const [alunos, setAlunos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        buscarAlunos();
    }, []);

    async function buscarAlunos() {
        const resposta = await fetch('/api/alunos');
        const dados = await resposta.json();
        setAlunos(dados);
    }

    async function cadastrarNota(evento) {
        evento.preventDefault();
        const resposta = await fetch("/api/notas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_aluno,
                t1,
                t2,
                n1,
                n2,
                n3
            })
        });
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);
        if (resposta.ok) {
            router.push("/listnota");
        }
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>
                        Cadastro de Notas
                    </h2>

                    <p className={styles.subtitle}>
                        Preencha as notas do aluno para realizar o cadastro no sistema.
                    </p>

                    <form className={styles.form} onSubmit={cadastrarNota}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="id_aluno">Aluno</label>
                            <select
                                id="id_aluno"
                                value={id_aluno}
                                onChange={(e) => setIdAluno(e.target.value)}
                                required
                            >
                                <option value="">Selecione o aluno</option>
                                {alunos.map((aluno) => (
                                    <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                        {aluno.nome} - RA: {aluno.ra}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.gridNotas}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="t1">Trabalho 1 (T1)</label>
                                <input
                                    id="t1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t1}
                                    onChange={(e) => setT1(e.target.value)}
                                    placeholder="0.0 – 10.0"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="t2">Trabalho 2 (T2)</label>
                                <input
                                    id="t2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t2}
                                    onChange={(e) => setT2(e.target.value)}
                                    placeholder="0.0 – 10.0"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n1">Nota 1 (N1)</label>
                                <input
                                    id="n1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n1}
                                    onChange={(e) => setN1(e.target.value)}
                                    placeholder="0.0 – 10.0"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n2">Nota 2 (N2)</label>
                                <input
                                    id="n2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n2}
                                    onChange={(e) => setN2(e.target.value)}
                                    placeholder="0.0 – 10.0"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n3">Nota 3 (N3)</label>
                                <input
                                    id="n3"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n3}
                                    onChange={(e) => setN3(e.target.value)}
                                    placeholder="0.0 – 10.0"
                                    required
                                />
                            </div>
                        </div>

                        <button className={styles.button} type="submit">
                            Cadastrar Nota
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
