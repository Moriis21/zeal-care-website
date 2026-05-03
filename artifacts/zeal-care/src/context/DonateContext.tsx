import { createContext, useContext, useState, type ReactNode } from "react";

export type SponsoredChild = {
  id: string;
  name: string;
};

type DonateContextType = {
  isOpen: boolean;
  openDonate: (amount?: number, child?: SponsoredChild) => void;
  closeDonate: () => void;
  initialAmount: number | undefined;
  sponsoredChild: SponsoredChild | undefined;
};

const DonateContext = createContext<DonateContextType>({
  isOpen: false,
  openDonate: () => {},
  closeDonate: () => {},
  initialAmount: undefined,
  sponsoredChild: undefined,
});

export function DonateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialAmount, setInitialAmount] = useState<number | undefined>(undefined);
  const [sponsoredChild, setSponsoredChild] = useState<SponsoredChild | undefined>(undefined);

  const openDonate = (amount?: number, child?: SponsoredChild) => {
    setInitialAmount(amount);
    setSponsoredChild(child);
    setIsOpen(true);
  };

  const closeDonate = () => {
    setIsOpen(false);
    setInitialAmount(undefined);
    setSponsoredChild(undefined);
  };

  return (
    <DonateContext.Provider value={{ isOpen, openDonate, closeDonate, initialAmount, sponsoredChild }}>
      {children}
    </DonateContext.Provider>
  );
}

export function useDonate() {
  return useContext(DonateContext);
}
