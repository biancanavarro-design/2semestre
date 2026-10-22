'use client';
import { useState, useEffect } from 'react';
import Header from "../components/header";
import styles from "./listnota.module.css";
import { useRouter } from "next/navigation";

export default function ListNota() {
    const [notas, setNotas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        buscarNotas();
    }, []);

    function editarNota(id) {
        router.push(`/editnota/${id}`);
    }

    async function buscarNotas() {
        const resposta = await fetch('/api/notas');
        const dados = await resposta.json();
        setNotas(dados);
    }

    async function excluirNota(event) {
        event.preventDefault();
        if (!confirm("Deseja realmente excluir esta nota?")) {
            return;
        }
        const resposta = await fetch("/api/notas", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_nota: event.target.dataset.id,
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        buscarNotas();
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <section className={styles.headerSection}>
                    <h2>Lista de Notas</h2>

                    <p>
                        Consulte todas as notas cadastradas no sistema.
                    </p>
                </section>

                <section className={styles.tableCard}>

                    <div className={styles.actions}>
                        <input
                            type="text"
                            placeholder="Pesquisar aluno..."
                            className={styles.search}
                        />

                        <div className={styles.total}>
                            Total: {notas.length} {notas.length === 1 ? 'registro' : 'registros'}
                        </div>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Aluno</th>
                                <th>RA</th>
                                <th>T1</th>
                                <th>T2</th>
                                <th>N1</th>
                                <th>N2</th>
                                <th>N3</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                notas.map((nota) => {
                                    return (
                                        <tr style={{ color: 'white', padding: '20px' }} key={nota.id_nota}>
                                            <td>{nota.id_nota}</td>
                                            <td>{nota.nome}</td>
                                            <td>{nota.ra}</td>
                                            <td>{nota.t1}</td>
                                            <td>{nota.t2}</td>
                                            <td>{nota.n1}</td>
                                            <td>{nota.n2}</td>
                                            <td>{nota.n3}</td>
                                            <td>
                                                <button onClick={() => editarNota(nota.id_nota)}>Editar</button>
                                                <button onClick={(e) => excluirNota(e)} data-id={nota.id_nota}>Excluir</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </section>
            </main>
        </>
    );
}
