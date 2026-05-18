import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitQuoteRequest } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { QuoteRequestInputPropertyType, QuoteRequestInputService } from "@workspace/api-client-react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  service: z.nativeEnum(QuoteRequestInputService),
  propertyType: z.nativeEnum(QuoteRequestInputPropertyType),
  location: z.string().optional(),
  message: z.string().min(10, "Please provide some details about what you need."),
});

interface QuoteFormProps {
  defaultService?: QuoteRequestInputService;
  className?: string;
  buttonText?: string;
}

export function QuoteForm({ defaultService, className = "", buttonText = "Request Free Quote" }: QuoteFormProps) {
  const { toast } = useToast();
  const submitQuote = useSubmitQuoteRequest();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: defaultService || QuoteRequestInputService["plumbing-installations"],
      propertyType: QuoteRequestInputPropertyType.home,
      location: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitQuote.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Quote request sent!",
          description: "We'll be in touch shortly to discuss your project.",
        });
        
        // Google Analytics Event
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', { 
            service: values.service,
            property_type: values.propertyType
          });
        }
        
        form.reset();
      },
      onError: (error: unknown) => {
        const description =
          (error as { message?: string })?.message ||
          "Please try again or call us directly.";
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description,
        });
      }
    });
  }

  const clearingServices: QuoteRequestInputService[] = [
    QuoteRequestInputService["tree-felling"],
    QuoteRequestInputService["site-clearing"],
    QuoteRequestInputService["farm-clearing"],
  ];
  const isTreeOrClearing = clearingServices.includes(form.watch("service"));

  return (
    <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 ${isTreeOrClearing ? 'border-[#1F5E3B]' : 'border-[#2563EB]'} ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h3>
        <p className="text-gray-600 text-sm">Fill out the form below and we'll get back to you fast.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="082 123 4567" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area / Suburb</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Summerstrand, Gqeberha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Service *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={QuoteRequestInputService["plumbing-installations"]}>Plumbing Installations</SelectItem>
                      <SelectItem value={QuoteRequestInputService["plumbing-maintenance"]}>Plumbing Maintenance</SelectItem>
                      <SelectItem value={QuoteRequestInputService["tree-felling"]}>Tree Felling</SelectItem>
                      <SelectItem value={QuoteRequestInputService["site-clearing"]}>Site Clearing</SelectItem>
                      <SelectItem value={QuoteRequestInputService["farm-clearing"]}>Farm Clearing</SelectItem>
                      <SelectItem value={QuoteRequestInputService.other}>Other / Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={QuoteRequestInputPropertyType.home}>Residential Home</SelectItem>
                      <SelectItem value={QuoteRequestInputPropertyType.business}>Commercial / Business</SelectItem>
                      <SelectItem value={QuoteRequestInputPropertyType.farm}>Farm / Agricultural</SelectItem>
                      <SelectItem value={QuoteRequestInputPropertyType.site}>Empty Site / Plot</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Details *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us a bit about the job (size of tree, type of plumbing issue, size of site, etc.)" 
                    className="min-h-[100px] resize-y" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className={`w-full py-6 text-lg font-bold text-white shadow-md hover:shadow-lg transition-all ${
              isTreeOrClearing 
                ? 'bg-[#1F5E3B] hover:bg-[#15462a]' 
                : 'bg-[#2563EB] hover:bg-[#1d4ed8]'
            }`}
            disabled={submitQuote.isPending}
          >
            {submitQuote.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              buttonText
            )}
          </Button>
          <p className="text-center text-xs text-gray-400 mt-2">
            No obligation. We respect your privacy.
          </p>
        </form>
      </Form>
    </div>
  );
}
