import { createContext, useContext, useState, type ReactNode } from "react";

type DonateContextType = {
  isOpen: boolean;
  openDonate: (amount?: number) => void;
  closeDonate: () => void;
  initialAmount: number | undefined;
};

const DonateContext = createContext<DonateContextType>({
  isOpen: false,
  openDonate: () => {},
  closeDonate: () => {},
  initialAmount: undefined,
});

export function DonateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialAmount, setInitialAmount] = useState<number | undefined>(undefined);

  const openDonate = (amount?: number) => {
    setInitialAmount(amount);
    setIsOpen(true);
  };

  const closeDonate = () => {
    setIsOpen(false);
    setInitialAmount(undefined);
  };

  return (
    <DonateContext.Provider value={{ isOpen, openDonate, closeDonate, initialAmount }}>
      {children}
    </DonateContext.Provider>
  );
}

export function useDonate() {
  return useContext(DonateContext);
}
