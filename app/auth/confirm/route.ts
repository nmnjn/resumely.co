import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { BASE_URL } from "@/utils/configs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (token_hash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (error) {
      return NextResponse.redirect(
        `${BASE_URL}/login?message=${error.message}`
      );
    } else {
      return NextResponse.redirect(`${BASE_URL}/`);
    }
  }

  return NextResponse.redirect(
    `${BASE_URL}/login?message=Invalid login request. Please try again later.`
  );
}
