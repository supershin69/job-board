import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectScrollDownButton, SelectScrollUpButton, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { fetchCompanies } from "@/app/lib/fetchCompany";

const currencies = [
  { "value": "usd", "name": "USD" },
  { "value": "eur", "name": "EUR" },
  { "value": "gbp", "name": "GBP" },
  { "value": "jpy", "name": "JPY" },
  { "value": "aud", "name": "AUD" },
  { "value": "cad", "name": "CAD" },
  { "value": "chf", "name": "CHF" },
  { "value": "cny", "name": "CNY" },
  { "value": "inr", "name": "INR" },
  { "value": "mmk", "name": "MMK" },
  { "value": "thb", "name": "THB" },
  { "value": "sgd", "name": "SGD" },
  { "value": "krw", "name": "KRW" },
  { "value": "nzd", "name": "NZD" },
  { "value": "mxn", "name": "MXN" }
];


async function Page() {
  const companies = await fetchCompanies();
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Post a new Job</CardTitle>
        <CardDescription>Fill in the details below...</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">
                Title
              </FieldLabel>
              <Input name="title" placeholder="Enter title..." required />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">
                Description
              </FieldLabel>
              <Textarea name="description" placeholder="Enter description..." required/>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="city">
                  City
                </FieldLabel>
                <Input name="city" placeholder="Enter city..." required />
              </Field>
              <Field>
                <FieldLabel htmlFor="country">
                  Country
                </FieldLabel>
                <Input name="country" placeholder="Enter country..." required />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="min">
                  Minimum Salary(Optional)
                </FieldLabel>
                <Input name="min" placeholder="Enter minimum salary..." />
              </Field>
              <Field>
                <FieldLabel htmlFor="max">
                  Maximum Salary(Optional)
                </FieldLabel>
                <Input name="max" placeholder="Enter maximum salary..." />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="currency">
                  Salary Type
                </FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger name="currency">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectScrollUpButton />
                    <SelectGroup>
                      {currencies.map((currency) => {
                        return (
                          <SelectItem key={currency.value} value={currency.value}>{currency.name}</SelectItem>
                        )
                      })}
                    </SelectGroup>
                    <SelectScrollDownButton />
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="company">
                  Company
                </FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger name="company">
                    <SelectValue placeholder="Company" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectScrollUpButton />
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                        )
                      })}
                    </SelectGroup>
                    <SelectScrollDownButton />
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="expires_at">
                Expiration Date
              </FieldLabel>

              <Input
                type="date"
                name="expires_at"
                required
              />
            </Field>
            
            
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
export default Page