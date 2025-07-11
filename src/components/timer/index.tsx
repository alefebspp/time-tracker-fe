import TimerDisplay from "../timer-display";
import { Button } from "../ui/button";
import { Record } from "@/types";

export type TimerProps = {
  startRecord?: Record;
  endRecord?: Record;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  isLoading: boolean;
  isMutating: boolean;
  actionInProgress: "start" | "end" | null;
  startSession: () => Promise<void>;
  endSession: () => Promise<void>;
};

export default function Timer(props: TimerProps) {
  const {
    isLoading,
    isMutating,
    actionInProgress,
    startRecord,
    endRecord,
    time,
  } = props;

  return (
    <section className="w-full flex flex-col gap-8">
      <h2 className="text-app-gray-dark text-center lg:text-left font-semibold text-2xl">
        Horas trabalhadas
      </h2>
      <div className="w-full flex justify-between items-center gap-4 lg:gap-8">
        <TimerDisplay value={time.hours} label="Horas" />
        <TimerDisplay value={time.minutes} label="Minutos" />
        <TimerDisplay value={time.seconds} label="Segundos" />
      </div>
      <div className="mx-auto w-full flex lg:w-1/2 flex-col lg:flex-row gap-4 lg:gap-8 mt-8 mb-16">
        <Button
          isLoading={isMutating && actionInProgress === "start"}
          onClick={props.startSession}
          disabled={!!startRecord || isLoading || isMutating}
          className="lg:w-1/2"
        >
          Iniciar
        </Button>
        <Button
          isLoading={isMutating && actionInProgress === "end"}
          onClick={props.endSession}
          disabled={!startRecord || !!endRecord || isLoading || isMutating}
          className="lg:w-1/2"
        >
          Parar
        </Button>
      </div>
    </section>
  );
}
