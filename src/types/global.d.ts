declare type ReactNode = import('react').ReactNode;

type ComponentWithChildren = {
  children: JSX.Element;
  className?: string;
};
