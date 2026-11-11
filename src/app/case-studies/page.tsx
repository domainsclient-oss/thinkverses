import { redirect } from "next/navigation";

// Only one case study exists so far; send the index to it until a listing page is built.
export default function CaseStudiesIndex() {
  redirect("/case-studies/controlled-environment-agriculture");
}
