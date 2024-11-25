"use client";
import React, { useEffect, useState } from "react";
import BaseTemplate from "../BaseTemplate/BaseTemplate";
import Button from "@/components/atoms/Button/button";
import { ButtonProps } from "@/components/atoms/Button/types";
import {
  appointmentType,
  patientType,
  careProfessionalType,
  userType,
} from "./types";
import { FaChevronLeft } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { FiRefreshCcw } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const AppointmentsTemplate = () => {
  const [appointmentsData, setAppointmentsData] = useState<appointmentType[]>(
    []
  );
  const [patientsData, setPatientsData] = useState<patientType[]>([]);
  const [careProfessionalsData, setCareProfessionalsData] = useState<
    careProfessionalType[]
  >([]);
  const [usersData, setUsersData] = useState<userType[]>([]);
  const formObj = {
    date: "",
    time: "",
    location: "",
    idPatient: 0,
    idCareProfessional: 0,
  };
  const [formData, setFormData] = useState<appointmentType>(formObj);
  const [error, setError] = useState("");
  const [toggleNewAppointments, setToggleNewAppointments] =
    useState<boolean>(false);
  const [sendEdit, setSendEdit] = useState<boolean>(false);

  const appointmentButton = {
    text: "Agendar novo",
    classname:
      "w-full py-2 mt-2 text-sm font-medium text-white border border-gray-100 bg-black rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700",
    onclick: () => {
      setToggleNewAppointments(!toggleNewAppointments);
    },
    type: "submit",
  } as ButtonProps;

  const URL = "https://ads-senac-pi-grupo-04-quarto-semestre.onrender.com/api/";

  const getAppointments = () => {
    fetch(`${URL}appointments`)
      .then((res) => {
        if (!res) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((appointmentsData) => setAppointmentsData(appointmentsData))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getAppointments();
  }, []);
  useEffect(() => {
    fetch(`${URL}careProfessionals`)
      .then((res) => {
        if (!res) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((careProfessionalsData) =>
        setCareProfessionalsData(careProfessionalsData)
      )
      .catch((err) => setError(err.message));
  }, []);
  useEffect(() => {
    fetch(`${URL}patients`)
      .then((res) => {
        if (!res) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((patientsData) => setPatientsData(patientsData))
      .catch((err) => setError(err.message));
  }, []);
  useEffect(() => {
    fetch(`${URL}users`)
      .then((res) => {
        if (!res) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((usersData) => setUsersData(usersData))
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const req = await fetch(`${URL}appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!req.ok) {
        throw new Error("Erro ao salvar agendamento");
      } else {
        const res = await req.json();
        console.log(res.message);
        setFormData(formObj);
        setToggleNewAppointments(false);
        getAppointments();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Erro ao salvar agendamento");
      return;
    }
  };

  const editAppointment = (appointment) => {
    console.log("appointment", appointment);

    setSendEdit(true);
    setToggleNewAppointments(true);
    setFormData(appointment);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);

    try {
      const req = await fetch(`${URL}appointments/${formData.idAppointment}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!req.ok) {
        throw new Error("Erro ao salvar agendamento");
      } else {
        const res = await req.json();
        console.log(res.message);
        setFormData(formObj);
        setToggleNewAppointments(false);
        getAppointments();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Erro ao salvar agendamento");
      return;
    }
  };

  const handleDelete = async (idAppointment) => {
    try {
      const req = await fetch(`${URL}appointments/${idAppointment}`, {
        method: "DELETE",
      });
      if (!req.ok) {
        throw new Error("Erro ao deletar agendamento");
      } else {
        console.log("Agendamento deletado!");
        await getAppointments();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Erro ao deletar agendamento");
      return;
    }
  };

  const getName = (idPerson: string) => {
    for (const f of careProfessionalsData) {
      for (const g of usersData) {
        if (+idPerson === f.idCareProfessional && f.idUser === g.idUser) {
          return g.name;
        }
      }
    }

    return null;
  };

  const CuidadorNome = ({ idPerson }) => {
    const name = getName(idPerson);
    return <span>{name}</span>;
  };
  // console.log("appointmentsData", appointmentsData);
  // console.log("careProfessionalsData", careProfessionalsData);
  // console.log("patientsData", patientsData);

  if (error) return <p>Erro: {error}</p>;
  if (
    !appointmentsData.length ||
    !careProfessionalsData.length ||
    !patientsData.length
  )
    return <p>Carregando</p>;
  return (
    <BaseTemplate>
      <header className="py-4 flex items-center justify-start w-full">
        <FaChevronLeft />
        <h2 className="text-2xl font-semibold mx-4">Meus agendamentos</h2>
      </header>
      <div className="my-4 w-full">
        <h3 className="text-xl font-semibold">Próximos agendamentos</h3>
        {appointmentsData.map((e) => (
          <div key={e.idAppointment}>
            <div className="my-3">
              <div>
                <span className="text-gray-500">
                  {new Date(e.date).toLocaleDateString()} - {e.time}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <CiCalendarDate className="text-5xl" />
                  <div className="flex flex-col">
                    <span>
                      Cuidador:{" "}
                      <CuidadorNome
                        idPerson={e.idCareProfessional.toString()}
                      />
                    </span>
                    <span className="text-gray-500">Local: {e.location}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold w-28 flex flex-col">
                    <span className="flex justify-end">(51)</span>
                    <span className="flex justify-end text-nowrap">
                      99999-6666
                    </span>
                  </span>
                  <FiRefreshCcw
                    className="text-xl mx-2 cursor-pointer"
                    onClick={() => editAppointment(e)}
                  />
                  <IoClose
                    className="text-xl text-red-700 cursor-pointer"
                    onClick={() => handleDelete(e.idAppointment)}
                  />
                </div>
              </div>
              <hr />
            </div>
          </div>
        ))}
        <Button {...appointmentButton} />
        {toggleNewAppointments && (
          <div className="my-4 w-full">
            <h3 className="text-xl font-semibold">Novo agendamento</h3>
            <form
              onSubmit={sendEdit ? handleEdit : handleSubmit}
              className="w-full flex flex-col"
            >
              <label>
                Digite o ID do Paciente
                <input
                  id="idPatient"
                  name="idPatient"
                  type="number"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.idPatient}
                />
              </label>
              <label>
                Digite o ID do Profissional
                <input
                  id="idCareProfessional"
                  name="idCareProfessional"
                  type="number"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.idCareProfessional}
                />
              </label>
              <label>
                Digite o endereço
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.location}
                />
              </label>
              <label>
                Selecione a data
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.date}
                />
              </label>
              <label>
                Selecione a data
                <input
                  id="time"
                  name="time"
                  type="time"
                  className="border mx-3 my-1"
                  onChange={handleChange}
                  value={formData.time}
                />
              </label>
              {sendEdit ? (
                <button type="submit" className="bg-lime-800 text-white">
                  Atualizar
                </button>
              ) : (
                <button type="submit" className="bg-lime-800 text-white">
                  Enviar
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default AppointmentsTemplate;
