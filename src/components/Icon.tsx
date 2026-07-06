import {
  Home01,
  BarChartSquare02,
  Users01,
  GraduationHat01,
  FileCheck02,
  UsersCheck,
  Grid01,
  ClipboardCheck,
  LifeBuoy01,
  Settings01,
  Star01,
  Flag01,
  CheckSquare,
  LineChartUp03,
  Circle,
} from "@untitledui/icons";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/** Only the icons referenced dynamically via string keys, to keep the bundle lean. */
const registry: Record<string, IconComponent> = {
  Home01,
  BarChartSquare02,
  Users01,
  GraduationHat01,
  FileCheck02,
  UsersCheck,
  Grid01,
  ClipboardCheck,
  LifeBuoy01,
  Settings01,
  Star01,
  Flag01,
  CheckSquare,
  LineChartUp03,
};

type IconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ name, className, strokeWidth }: IconProps) {
  const Cmp = registry[name] ?? Circle;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
