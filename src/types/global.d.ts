declare type ReactNode = import('react').ReactNode;

type ComponentWithChildren = {
  children: ReactNode;
  className?: string;
};
