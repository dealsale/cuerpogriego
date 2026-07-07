import { getAppSettings } from "@/lib/appSettings";
import { RegistrationToggle } from "@/components/admin/RegistrationToggle";

export default async function AdminConfigPage() {
  const settings = await getAppSettings();

  return (
    <div>
      <div className="mb-7">
        <span className="font-display tracking-[0.22em] text-[11px] text-gold uppercase">
          Panel administrativo
        </span>
        <h1 className="font-display font-bold text-[34px] mt-2 mb-0">Configuración</h1>
      </div>

      <div className="bg-card border border-gold/16 p-5.5 max-w-xl">
        <div className="font-display text-[15px] text-gold-light mb-4">Parámetros generales</div>
        <div className="flex items-center justify-between py-2.5 border-b border-white/5 text-sm text-muted-1">
          <span>Registro de nuevos usuarios</span>
          <RegistrationToggle initialOpen={settings.registrationOpen} />
        </div>
        <div className="flex items-center justify-between py-2.5 border-b border-white/5 text-sm text-muted-1">
          <span>Motor de IA</span>
          <span className="text-gold-light">
            {process.env.DEEPSEEK_API_KEY
              ? "DeepSeek"
              : "DeepSeek (sin API key — usando datos de respaldo)"}
          </span>
        </div>
        <div className="flex items-center justify-between py-2.5 text-sm text-muted-1">
          <span>Plan Premium</span>
          <span className="text-muted-3">Próximamente</span>
        </div>
      </div>
    </div>
  );
}
