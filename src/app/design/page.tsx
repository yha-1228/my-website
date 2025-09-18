import { Container } from "@/components/ui/styled/container";
import { Heading1 } from "@/components/ui/styled/heading1";

export default async function Page() {
  return (
    <div className="py-14">
      <Container className="md:max-w-(--breakpoint-md)">
        <section>
          <div className="text-center">
            <Heading1>見出しです</Heading1>
          </div>
          <div className="bg-red text-white">中身です</div>
        </section>
      </Container>
    </div>
  );
}
