import React, { useEffect, useState } from "react";
import { etudiantsAPI } from '../../api/api.js';

export default function ListesEtudiants() {

    const [etudiants, setEtudiants] = useState([]);

    const chargerEtudiants = async () => {

        try {
            const res = await etudiantsAPI.getAll();

            setEtudiants(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        chargerEtudiants();
    }, []);

    return (
        <div className="container mt-4">

            <h2>Liste des étudiants</h2>

            <table className="table table-bordered table-striped">

                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                    </tr>
                </thead>

                <tbody>
                    {etudiants.map((etu) => (
                        <tr key={etu.id}>
                            <td>{etu.matricule}</td>
                            <td>{etu.nom}</td>
                            <td>{etu.prenom}</td>
                            <td>{etu.email}</td>
                            <td>{etu.telephone}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}