import React, { useState } from 'react';
import {
  Button,
  ButtonLink,
  IconButton,
  Heading,
  Text,
  Lead,
  Badge,
  Alert,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Input,
  Label,
  Select,
  Checkbox,
  RadioGroup,
  Textarea,
  FormField,
  Dialog,
  DialogFooter,
  Drawer,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  Progress,
  Skeleton,
  Section,
  Grid,
  Stack,
  Hero,
  FeatureCard,
  FeatureGrid,
  Testimonial,
  PricingCard,
} from '@/shared/ui';
import { Seo } from '@/shared/ui/Seo';
import { Bell, Check, ChevronRight, Mail, Moon, Sun, Trash2 } from 'lucide-react';
import { Toaster } from '@/shared/ui';
import { toast } from '@/shared/lib/toast';

export const DesignSystemPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [radioValue, setRadioValue] = useState('all');

  return (
    <>
      <Seo title="Design System" description="Component showcase and style guide." noindex />
      <Toaster />

      <div className="min-h-screen bg-background pb-20 pt-24">
        <div className="container">
          <div className="mb-16">
            <Heading level={1} className="mb-4">Design System</Heading>
            <Lead>
              A showcase of the application's design tokens, primitives, and components.
            </Lead>
          </div>

          <Stack gap="lg">
            {/* Typography */}
            <Section id="typography">
              <div className="mb-8 border-b border-border pb-4">
                <Heading level={2}>Typography</Heading>
                <Text variant="muted">Fluid type scale using Inter font family.</Text>
              </div>
              <div className="space-y-8">
                <div className="grid gap-4 rounded-lg border border-border p-6">
                  <Heading level={1}>Heading 1</Heading>
                  <Heading level={2}>Heading 2</Heading>
                  <Heading level={3}>Heading 3</Heading>
                  <Heading level={4}>Heading 4</Heading>
                  <Heading level={5}>Heading 5</Heading>
                  <Heading level={6}>Heading 6</Heading>
                </div>
                <div className="grid gap-4 rounded-lg border border-border p-6">
                  <Lead>This is a lead paragraph, used for introductions and summaries.</Lead>
                  <Text>
                    This is the default body text. It is optimized for readability with a comfortable line height.
                    The quick brown fox jumps over the lazy dog.
                  </Text>
                  <Text variant="small">
                    This is small text, used for metadata, captions, or legal print.
                  </Text>
                  <Text variant="muted">
                    This is muted text, used for secondary information that shouldn't compete with the main content.
                  </Text>
                  <Text variant="caption" className="uppercase tracking-wider">
                    Caption Text
                  </Text>
                </div>
              </div>
            </Section>

            {/* Colors */}
            <Section id="colors">
              <div className="mb-8 border-b border-border pb-4">
                <Heading level={2}>Colors</Heading>
                <Text variant="muted">Semantic color palette defined in CSS variables.</Text>
              </div>
              <Grid className="grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <ColorSwatch name="Background" variable="--background" className="bg-background border border-border" />
                <ColorSwatch name="Foreground" variable="--foreground" className="bg-foreground text-background" />
                <ColorSwatch name="Primary" variable="--primary" className="bg-primary text-primary-foreground" />
                <ColorSwatch name="Secondary" variable="--secondary" className="bg-secondary text-secondary-foreground" />
                <ColorSwatch name="Muted" variable="--muted" className="bg-muted text-muted-foreground" />
                <ColorSwatch name="Accent" variable="--accent" className="bg-accent text-accent-foreground" />
                <ColorSwatch name="Destructive" variable="--destructive" className="bg-destructive text-destructive-foreground" />
                <ColorSwatch name="Success" variable="--success" className="bg-success text-success-foreground" />
                <ColorSwatch name="Warning" variable="--warning" className="bg-warning text-warning-foreground" />
                <ColorSwatch name="Border" variable="--border" className="bg-border" />
                <ColorSwatch name="Input" variable="--input" className="bg-input text-foreground" />
                <ColorSwatch name="Ring" variable="--ring" className="bg-ring" />
              </Grid>
            </Section>

            {/* Buttons */}
            <Section id="buttons">
              <div className="mb-8 border-b border-border pb-4">
                <Heading level={2}>Buttons</Heading>
                <Text variant="muted">Interactive elements with various states and sizes.</Text>
              </div>
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button isLoading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button variant="primary">
                    <Mail className="mr-2 h-4 w-4" /> With Icon
                  </Button>
                  <IconButton aria-label="Delete" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            </Section>

            {/* Form Elements */}
            <Section id="forms">
              <div className="mb-8 border-b border-border pb-4">
                <Heading level={2}>Form Elements</Heading>
                <Text variant="muted">Inputs, selects, and controls.</Text>
              </div>
              <div className="grid max-w-2xl gap-8">
                <div className="grid gap-4">
                  <FormField label="Email Address" description="We'll never share your email." required>
                    <Input type="email" placeholder="you@example.com" />
                  </FormField>
                  
                  <FormField label="Full Name" error="This field is required">
                    <Input placeholder="John Doe" invalid />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Role">
                      <Select options={[
                        { label: 'Developer', value: 'dev' },
                        { label: 'Designer', value: 'des' },
                        { label: 'Manager', value: 'mgr' },
                      ]} />
                    </FormField>
                    <FormField label="Experience">
                      <Select options={[
                        { label: 'Select level', value: '', disabled: true },
                        { label: 'Junior', value: 'jr' },
                        { label: 'Senior', value: 'sr' },
                      ]} defaultValue="" />
                    </FormField>
                  </div>

                  <FormField label="Bio">
                    <Textarea placeholder="Tell us about yourself..." />
                  </FormField>

                  <Checkbox id="terms" label="I accept the terms and conditions" />

                  <div className="space-y-3">
                    <Label>Notifications</Label>
                    <RadioGroup 
                      name="notifications"
                      value={radioValue}
                      onChange={setRadioValue}
                      options={[
                        { label: 'All new messages', value: 'all' },
                        { label: 'Direct messages only', value: 'direct' },
                        { label: 'None', value: 'none', disabled: true },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Feedback */}
            <Section id="feedback">
              <div className="mb-8 border-b border-border pb-4">
                <Heading level={2}>Feedback</Heading>
                <Text variant="muted">Badges, alerts, and toasts.</Text>
              </div>
              <div className="space-y-8">
                <div className="flex flex-wrap gap-4">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>

                <div className="grid gap-4 max-w-2xl">
                  <Alert title="Heads up!" variant="info">
                    You can add components to your app using the cli.
                  </Alert>
                  <Alert title="Success!" variant="success">
                    Your changes have been saved successfully.
                  </Alert>
                  <Alert title="Warning" variant="warning">
                    Your account is about to expire.
                  </Alert>
                  <Alert title="Error" variant="destructive">
                    Something went wrong. Please try again.
                  </Alert>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => toast.success('Saved!', { description: 'Changes saved.' })}>
                    Show Success Toast
                  </Button>
                  <Button variant="outline" onClick={() => toast.error('Error!', { description: 'Something went wrong.' })}>
                    Show Error Toast
                  </Button>
                </div>
                
                <div>
                   <Tooltip content="Add to library" side="right">
                      <Button variant="outline" size="sm">Hover me (Tooltip)</Button>
                   </Tooltip>
                </div>
              </div>
            </Section>

             {/* Layout & Overlay */}
             <Section id="overlay">
              <div className="mb-8 border-b border-border pb-4">
                <Heading level={2}>Layout & Overlay</Heading>
                <Text variant="muted">Dialogs, drawers, cards, and accordions.</Text>
              </div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
                  <Dialog 
                    open={dialogOpen} 
                    onClose={() => setDialogOpen(false)}
                    title="Edit Profile"
                    description="Make changes to your profile here. Click save when you're done."
                  >
                      <div className="grid gap-4 py-4">
                        <FormField label="Name"><Input defaultValue="Pedro Duarte" /></FormField>
                        <FormField label="Username"><Input defaultValue="@peduarte" /></FormField>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => setDialogOpen(false)}>Save changes</Button>
                      </DialogFooter>
                  </Dialog>

                  <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
                  <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} side="right">
                    <div className="p-6">
                      <Heading level={3} className="mb-4">Menu</Heading>
                      <nav className="flex flex-col gap-2">
                        <Button variant="ghost" className="justify-start">Home</Button>
                        <Button variant="ghost" className="justify-start">About</Button>
                        <Button variant="ghost" className="justify-start">Services</Button>
                        <Button variant="ghost" className="justify-start">Contact</Button>
                      </nav>
                    </div>
                  </Drawer>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <Heading level={4}>Card Title</Heading>
                      <Text variant="muted">Card Description</Text>
                    </CardHeader>
                    <CardContent>
                      <Text>This is the main content of the card. It can contain any other components.</Text>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost">Cancel</Button>
                      <Button>Submit</Button>
                    </CardFooter>
                  </Card>

                  <Accordion type="single">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>Yes. It comes with default styles that matches the other components.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <Tabs defaultValue="account" className="w-[400px]">
                  <TabList>
                    <Tab value="account">Account</Tab>
                    <Tab value="password">Password</Tab>
                  </TabList>
                  <TabPanel value="account">
                     <div className="p-4 border rounded-b-md border-t-0 bg-background mt-0">
                        <Text>Make changes to your account here.</Text>
                     </div>
                  </TabPanel>
                  <TabPanel value="password">
                    <div className="p-4 border rounded-b-md border-t-0 bg-background mt-0">
                      <Text>Change your password here.</Text>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </Section>

            {/* Marketing */}
            <Section id="marketing">
              <div className="mb-8 border-b border-border pb-4">
                <Heading level={2}>Marketing Components</Heading>
                <Text variant="muted">Blocks for building landing pages.</Text>
              </div>
              <Stack gap="lg">
                <Hero
                  title="Build faster with our starter"
                  description="A production-ready foundation for marketing sites with TinaCMS, React, and Tailwind."
                  actions={
                    <>
                      <Button size="lg">Get Started</Button>
                      <Button variant="outline" size="lg">Learn More</Button>
                    </>
                  }
                  className="rounded-xl border border-border"
                />

                <FeatureGrid>
                  <FeatureCard
                    icon={<Sun />}
                    title="Light & Dark"
                    description="Optimized for both light and dark modes out of the box."
                  />
                  <FeatureCard
                    icon={<Check />}
                    title="Accessible"
                    description="Built with WCAG 2.1 AA standards in mind."
                  />
                  <FeatureCard
                    icon={<Bell />}
                    title="Notifications"
                    description="Includes a robust toast notification system."
                  />
                </FeatureGrid>

                <div className="grid md:grid-cols-2 gap-8">
                  <Testimonial
                    quote="This starter saved us weeks of development time. The code quality is outstanding."
                    author={{ name: 'Sarah Chen', title: 'CTO', company: 'TechCorp' }}
                  />
                  <PricingCard
                    name="Pro Plan"
                    price={29}
                    features={['Unlimited projects', 'Analytics', 'Priority support']}
                    popular
                    cta={<Button className="w-full">Choose Pro</Button>}
                  />
                </div>
              </Stack>
            </Section>

          </Stack>
        </div>
      </div>
    </>
  );
};

const ColorSwatch: React.FC<{ name: string; variable: string; className: string }> = ({ name, variable, className }) => (
  <div className="flex flex-col gap-2">
    <div className={`h-20 w-full rounded-lg shadow-sm ${className}`} />
    <div>
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-muted-foreground font-mono">{variable}</div>
    </div>
  </div>
);
