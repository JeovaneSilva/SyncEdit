import React, { useState, useEffect } from 'react';
import { FaSyncAlt } from "react-icons/fa";
import { ModalEditorDiv, FooterEditor } from './stylesModais';
import { CarregarProjetosColaborador } from '../../firebase/firebaseFunctions';
import { db } from '../../firebase/firebaseConfig';
import html2pdf from 'html2pdf.js';
import ModalMostrarMenbros from './ModalMostrarMenbros';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ModalEditorColab = ({ content, nomeProjeto, setModalEditorColaborador, uid, userName, setProjetosColaborador }) => {
    const [modalMenbros, setModalMenbros] = useState(false);

    const closeEditorColaborador = async () => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const dataFormatada = `${ano}-${mes}-${dia}`;

        try {
            const snapshot = await db.ref(`users`).once('value');
            const usersData = snapshot.val();

            if (usersData) {
                Object.values(usersData).forEach(async (user) => {
                    if (user.documentos) {
                        Object.entries(user.documentos).forEach(async ([key, projeto]) => {
                            if (projeto.nameProject === nomeProjeto && !projeto.colaborador) {
                                await db.ref(`users/${user.id}/documentos/${key}`).update({
                                    ultimoAcesso: dataFormatada
                                })
                            }
                        });
                    }
                });
            }
        } catch (error) {
            console.error("Erro ao salvar o texto do projeto colaborador:", error);
        }

        setModalEditorColaborador(false);
        CarregarProjetosColaborador(uid, userName, setProjetosColaborador);
    };

    const handleDownloadPDF = () => {
        const contentHtml = content;

        const opt = {
            margin: 1,
            filename: `${nomeProjeto}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().set(opt).from(contentHtml).save();
    };

    const MostrarMembros = () => {
        setModalMenbros(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await db.ref(`users`).once('value');
                const usersData = snapshot.val();

                if (usersData) {
                    Object.values(usersData).forEach((user) => {
                        if (user.documentos) {
                            Object.entries(user.documentos).forEach(([key, doc]) => {
                                if (doc.nameProject === nomeProjeto) {
                                    setContent(doc.text || '');
                                }
                            });
                        }
                    });
                }
            } catch (error) {
                console.error("Erro ao recuperar texto do projeto colaborador:", error);
            }
        };

        fetchData();

        // Adicionar listener de evento para atualizações em tempo real
        const projectRef = db.ref(`users`);
        projectRef.on('value', snapshot => {
            const usersData = snapshot.val();

            if (usersData) {
                Object.values(usersData).forEach((user) => {
                    if (user.documentos) {
                        Object.entries(user.documentos).forEach(([key, doc]) => {
                            if (doc.nameProject === nomeProjeto) {
                                setContent(doc.text || '');
                            }
                        });
                    }
                });
            }
        });

        return () => {
            // Limpar o listener quando o componente é desmontado
            projectRef.off('value');
        };
    }, [uid, nomeProjeto]);

    return (
        <>
            <ModalEditorDiv>
                <div style={{ backgroundColor: 'white', height: '75%', padding: '10px' }}>
                    <ReactQuill
                        value={content}
                        modules={{ toolbar: false }}
                        readOnly={true}
                        theme="snow"
                    />
                </div>
                <FooterEditor>
                    <div>
                        <label>Nome do Projeto: {nomeProjeto}</label>
                    </div>
                    <div>
                        <div>
                            <button onClick={closeEditorColaborador}>Fechar</button>
                        </div>
                        <div>
                            <button onClick={handleDownloadPDF}>Baixar</button>
                            <button onClick={MostrarMembros}>Membros</button>
                        </div>
                    </div>
                </FooterEditor>
            </ModalEditorDiv>

            {modalMenbros &&
                <ModalMostrarMenbros
                    uid={uid}
                    nomeProjeto={nomeProjeto}
                    setModalMenbros={setModalMenbros}
                />
            }
        </>
    )
}

export default ModalEditorColab;
