import { Button } from "danholibraryrjs";
import { CitizenProvider } from "providers/CitizenProvider";
import { CitizenCard } from "../CitizenCard";
import { Citizen } from "models/backend/common";

type Props = {
  pageTitle: string;
  entity: string;
  citizens: Array<Citizen>;
};

export default function OverviewLayout({ pageTitle, entity, citizens }: Props) {
  return (
    <main>
      <header>
        <Button importance="secondary">Tilbage til oversigt</Button>
        <h1>{pageTitle}</h1>
        <Button importance="primary" className="alt">Opret {entity}</Button>
      </header>

      <section className="citizen-list" role="list">
        {citizens.map(citizen => (
          <CitizenProvider key={citizen.id} citizen={citizen}>
            <CitizenCard citizen={citizen} />
          </CitizenProvider>
        ))}
      </section>
    </main>
  );
}