// emails/ConfirmEmailTemplate.tsx
import { Html, Head, Body, Container, Section, Text, Button } from '@react-email/components';

interface Props { name: string; datetime: string; }

export default function ConfirmEmailTemplate({ name, datetime }: Props) {
    return (
        <Html>
            <Head />
            <Body style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
                <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px' }}>
                    <Section>
                        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            ¡Hola, {name}!
                        </Text>
                        <Text style={{ fontSize: '16px' }}>
                            Tu cita ha sido confirmada para: <strong>{new Date(datetime).toLocaleString()}</strong>
                        </Text>
                        <Button
                            pX={20} pY={12}
                            style={{ backgroundColor: '#7c3aed', borderRadius: '6px', color: '#fff', textDecoration: 'none' }}
                            href="https://emyux.com"
                        >
                            Visitar nuestro sitio
                        </Button>
                        <Text style={{ fontSize: '14px', color: '#666', marginTop: '16px' }}>
                            Gracias por confiar en nosotros. Si tienes alguna duda, responde a este correo.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
