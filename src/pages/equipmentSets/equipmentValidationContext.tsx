import React, { createContext, useContext, useMemo } from "react";

import { equipmentSetBundles } from "../../data/equipmentRegistry";
import type { BundleValidationResult } from "../../utils/validateEquipmentBundle";
import { validateEquipmentBundle } from "../../utils/validateEquipmentBundle";

export type ValidationMap = Record<string, BundleValidationResult>;

type ValidationContextValue = {
  validationBySet: ValidationMap;
};

const ValidationContext = createContext<ValidationContextValue>({
  validationBySet: {}
});

export function EquipmentValidationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const validationBySet = useMemo(() => {
    const map: ValidationMap = {};
    for (const b of equipmentSetBundles) {
      map[b.equipSet] = validateEquipmentBundle(b);
    }
    return map;
  }, []);

  const value = useMemo(() => ({ validationBySet }), [validationBySet]);

  return (
    <ValidationContext.Provider value={value}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useEquipmentValidation(): ValidationContextValue {
  return useContext(ValidationContext);
}
