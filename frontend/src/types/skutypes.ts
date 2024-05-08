export interface Medication {
  id: number;
  name: string;
  dose: number | null;
  presentation: string;
  unit: number | null;
  countries: string[];
}

export interface AddMedication {
  name: string;
  dose: number | null;
  presentation: string;
  unit: number | null;
  countries: string[];
}

export interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedicine: (newMedicine: Medication) => void;
}

export interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: Medication | null;
  countries: any;
}
