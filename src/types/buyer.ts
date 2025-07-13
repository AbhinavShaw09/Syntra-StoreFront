export type BuyerAddress = {
  id: number,
  user_id: number; 
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number?: string | null;
  address_line1: string;
  address_line2: string;
  city: string;
  country: string;
};