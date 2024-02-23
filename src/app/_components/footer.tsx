import Container from '@/app/_components/container';

export default function Footer() {
  return (
    <footer className="border-border bg-muted border-t">
      <Container>
        <div className="flex flex-col items-center py-8 lg:flex-row">
          <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
            <a
              href="https://github.com/jtmthf/jtmthf"
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
