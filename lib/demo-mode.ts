/**
 * Modo demonstração explícito (opt-in).
 *
 * Dados fictícios de canais/configuração só podem ser usados quando
 * `NEXT_PUBLIC_ENABLE_DEMO=1` estiver definido. Sem a variável, uma falha do Core
 * resulta SEMPRE em estado de erro — nunca em dados falsos.
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_ENABLE_DEMO === "1";
