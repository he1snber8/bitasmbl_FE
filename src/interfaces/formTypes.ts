// Define the InputProps type
type InputProps = {
  label: string;
  type: string;
  name: string;
  ref: React.RefObject<HTMLInputElement>;
  placeholder?: string;
};

// Component props to accept dynamic input fields
export interface SimpleRegistrationFormProps {
  inputFields: InputProps[];
  onClose: () => void;
  header: string;
  thirdPartyOptText: string;
  registration?: boolean | false;
  submitText?: string;
  footerText?: boolean;
}
