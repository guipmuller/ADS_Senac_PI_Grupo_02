import { InputFieldForm } from "@/components/atoms/InputFieldForm/InputFieldForm";
import { formAppointmentType } from "@/components/templates/mySchedulesPage/types";

interface AddressFormProps {
  form: formAppointmentType;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressForm = ({ form, onAddressChange }: AddressFormProps) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-lg font-medium">Endereço</h4>
    
    <InputFieldForm
      label="Rua"
      id="street"
      name="street"
      value={form.address.street}
      onChange={onAddressChange}
      fullWidth
    />
    
    <div className="grid grid-cols-2 gap-4">
      <InputFieldForm
        label="Número"
        id="number"
        name="number"
        value={form.address.number}
        onChange={onAddressChange}
      />
      <InputFieldForm
        label="Complemento"
        id="complement"
        name="complement"
        value={form.address.complement}
        onChange={onAddressChange}
      />
    </div>
    
    <InputFieldForm
      label="Bairro"
      id="neighborhood"
      name="neighborhood"
      value={form.address.neighborhood}
      onChange={onAddressChange}
      fullWidth
    />
    
    <div className="grid grid-cols-2 gap-4">
      <InputFieldForm
        label="Cidade"
        id="city"
        name="city"
        value={form.address.city}
        onChange={onAddressChange}
      />
      <InputFieldForm
        label="Estado"
        id="state"
        name="state"
        value={form.address.state}
        onChange={onAddressChange}
      />
    </div>
    
    <InputFieldForm
      label="CEP"
      id="postalCode"
      name="postalCode"
      value={form.address.postalCode}
      onChange={onAddressChange}
      fullWidth
    />
  </div>
);