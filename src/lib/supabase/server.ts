import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";
import {incrementDbRequests} from "../request-counter";
import {SupabaseClient} from "@supabase/supabase-js";

const logDbRequest = (method: string, table: string) => {
  const requestCount = incrementDbRequests();
  const timestamp = new Date().toISOString();
  console.log('\x1b[34m%s\x1b[0m', `[DB Request] Method: ${method} | Table: ${table} | Time: ${timestamp} | Total DB Requests: ${requestCount}`);
};

export const createClient = () => {
    const cookieStore = cookies();

  const client = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set({name, value, ...options});
            } catch (error) {
              // Handle cookie error
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.delete({name, ...options});
            } catch (error) {
              // Handle cookie error
            }
          },
        },
      },
  );

  // Wrap database methods to add logging
  return {
    ...client,
    from: (table: string) => {
      const originalFrom = client.from(table);
      return {
        ...originalFrom,
        select: (query?: string) => {
          logDbRequest('SELECT', table);
          return originalFrom.select(query);
        },
        insert: (values: any) => {
          logDbRequest('INSERT', table);
          return originalFrom.insert(values);
        },
        update: (values: any) => {
          logDbRequest('UPDATE', table);
          return originalFrom.update(values);
        },
        delete: () => {
          logDbRequest('DELETE', table);
          return originalFrom.delete();
        },
        upsert: (values: any) => {
          logDbRequest('UPSERT', table);
          return originalFrom.upsert(values);
        },
      };
    },
    rpc: (fn: string, params?: any) => {
      logDbRequest('RPC', fn);
      return client.rpc(fn, params);
    },
  } as SupabaseClient;
};