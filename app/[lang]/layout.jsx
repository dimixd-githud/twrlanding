import HtmlLang from '../../components/HtmlLang';

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  return <><HtmlLang lang={lang} />{children}</>;
}
