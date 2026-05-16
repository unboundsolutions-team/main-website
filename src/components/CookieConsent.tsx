import { useState, useEffect } from "react";
import { Shield, X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpenCookieSettings = () => {
      const saved = localStorage.getItem("cookie-consent");
      if (saved) {
        try { setPreferences(JSON.parse(saved)); } catch {}
      }
      setShowPreferences(true);
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-settings", handleOpenCookieSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenCookieSettings);
  }, []);

  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const rejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-elevated p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">We Value Your Privacy</h3>
          </div>
          <button
            onClick={rejectAll}
            aria-label="Close cookie banner"
            className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
          By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or reject 
          non-essential cookies. Read our{" "}
          <a href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          for more information.
        </p>

        {showPreferences && (
          <div className="mb-6 space-y-3 p-4 bg-muted/50 rounded-xl">
            <label className="flex items-center justify-between cursor-not-allowed">
              <div>
                <span className="text-sm font-medium">Strictly Necessary</span>
                <p className="text-xs text-muted-foreground">Required for the website to function properly.</p>
              </div>
              <input type="checkbox" checked disabled className="accent-primary w-4 h-4" aria-label="Strictly necessary cookies (always enabled)" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium">Analytics</span>
                <p className="text-xs text-muted-foreground">Help us understand how visitors interact with the site.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="accent-primary w-4 h-4"
                aria-label="Analytics cookies"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium">Marketing</span>
                <p className="text-xs text-muted-foreground">Used to deliver personalized advertisements.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="accent-primary w-4 h-4"
                aria-label="Marketing cookies"
              />
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={acceptAll}
            className="btn-primary !py-2.5 !px-6 text-sm"
          >
            Accept All
          </button>
          <button
            onClick={rejectAll}
            className="btn-secondary !py-2.5 !px-6 text-sm"
          >
            Reject All
          </button>
          {showPreferences ? (
            <button
              onClick={savePreferences}
              className="text-sm font-medium text-primary hover:underline px-4 py-2"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={() => setShowPreferences(true)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
            >
              Manage Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
