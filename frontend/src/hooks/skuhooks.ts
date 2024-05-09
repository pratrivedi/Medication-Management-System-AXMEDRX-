import { useState, useEffect } from "react";
import { Medication } from "@/types/skutypes";

const useMedicationManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [skus, setSkus] = useState<Medication[]>([]);
  const [countries, setContries] = useState();
  const [upload, setUpload] = useState<boolean>(false);

  useEffect(() => {
    console.log("calling fetching ------->");
    fetchMedications();
  }, [isAddModalOpen, isModalOpen]);

  const fetchMedications = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/medications/");
      if (!response.ok) {
        throw new Error("Failed to fetch medications");
      }
      const data = await response.json();
      console.log({ data });
      setSkus(data.medications);
      setContries(data.countries);
    } catch (error) {
      console.error("Error fetching medications:", error);
    }
  };

  const emojis = ["💊", "💉", "🩹", "🩼", "🩺", "🩻", "🩸"];

  const handleEdit = (medication: Medication) => {
    setSelectedMedication(medication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedication(null);
  };

  const handleAddMedicine = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/medications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete medication");
      }
      setSkus(skus.filter((med) => med.id !== id));
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const handleUpload = () => {
    setUpload(true);
  };

  const handleCloseUpload = () => {
    setUpload(false);
  };

  return {
    isModalOpen,
    selectedMedication,
    isAddModalOpen,
    skus,
    emojis,
    handleEdit,
    handleCloseModal,
    handleAddMedicine,
    handleCloseAddModal,
    handleDelete,
    countries,
    handleUpload,
    upload,
    handleCloseUpload,
  };
};

export default useMedicationManagement;
