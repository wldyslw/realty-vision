import Head from 'next/head';
import { memo } from 'react';
import useTranslation from 'next-translate/useTranslation';

function About() {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{`${t('navigation.about')} | The Building`}</title>
            </Head>
            <div className="opacity-scale-appear h-full w-full overflow-y-auto px-8 py-4 lg:px-32 lg:py-8">
                <h1 className="pb-2 text-4xl font-bold">
                    {t('navigation.about')}
                </h1>

                <div>
                    <img
                        src="https://grupityanaygrouptlv.com/wp-content/uploads/2023/04/house-1.jpg"
                        alt=""
                        className="mb-8 me-16 w-full rounded-md ltr:float-left rtl:float-right md:w-1/3"
                    />

                    {/* EN */}
                    <h2 className="text-en pb-4 text-2xl text-typo-secondary">
                        About the project
                    </h2>
                    <p className="text-en mb-2 text-xl">
                        Welcome to your next home in Tel Aviv in the prestigious
                        Tzalah neighborhood in the pulsating heart of the city.
                    </p>
                    <p className="text-en mb-2 text-xl">
                        A unique living experience in addition to a high quality
                        of life! In an amazing location in a neighborhood where
                        most of the buildings are private or two-family houses,
                        the residents enjoy a warm and diverse community,
                        walking accessibility to the school, the kindergartens,
                        a neighborhood commercial center, many gardens alongside
                        exciting natural corners.
                    </p>
                    <p className="text-en mb-2 text-xl">
                        Large and spacious 5-6 room apartments. Penthouse and
                        garden starting from 124 square meters built +
                        garden/sun terrace. 2 apartments per floor only.
                    </p>
                    <p className="text-en mb-2 text-xl">
                        Very spacious apartments, and designed to a high
                        standard. Rich and indulgent technical specifications
                        Possibility of changes according to your taste Occupancy
                        08/2025. Full banking support for the project, very
                        favorable payment terms
                    </p>

                    {/* HE */}
                    <h2 className="text-he pb-4 text-2xl text-typo-secondary">
                        אודות הפריוקט
                    </h2>
                    <p className="text-he mb-2 text-xl">
                        ברוכים הבאים לבית הבא שלכם בתל-אביב בשכונת צהלה היוקרתית
                        בליבה הפועם של העיר.
                    </p>
                    <p className="text-he mb-2 text-xl">
                        חווית מגורים ייחודית בנוסף לאיכות חיים גבוהה! במיקום
                        מדהים בשכונה שמרביתם של המבנים הינם בתים פרטיים או דו
                        משפחתיים, התושבים נהנים מקהילה חמה ומגוונת, נגישות הליכה
                        לבית הספר, גני הילדים, מרכז מסחרי שכונתי, גינות רבות לצד
                        פינות טבע מרגשות.
                    </p>
                    <p className="text-he mb-2 text-xl">
                        דירות גדולות ומרווחות 5-6 חדרים. פנטהאוז וגן החל מ 124
                        מר בנוי + גינה/מרפסת שמש. 2 דירות בקומה בלבד.
                    </p>
                    <p className="text-he mb-2 text-xl">
                        דירות מרווחות ביותר, ומעוצבות ברמה הגבוה. מפרט טכני עשיר
                        ומפנק אפשרות לשינויים לפי טעמכם אכלוס 08/2025 ליווי
                        בנקאי מלא לפרויקט תנאי תשלום נוחים מאוד
                    </p>
                </div>
                <div className="clear-left py-4">
                    <img
                        src="https://grupityanaygrouptlv.com/wp-content/uploads/2023/04/yanay-group-logo.png"
                        alt=""
                        className="mb-8 ms-16 w-full rounded-md ltr:float-right rtl:float-left md:w-1/4"
                    />

                    {/* EN */}
                    <h2 className="text-en mb-4 text-2xl text-typo-secondary">
                        Who we are
                    </h2>
                    <p className="text-en mb-2 text-xl">
                        Our office has existed since 2015. Our office
                        specializes mainly in the Ramat Gan-Givataim area - in
                        the sale / rental of new and second-hand properties. -
                        Project marketing - urban renewal - property management.
                        Our office places great emphasis on Reliability,
                        directness, and transparency are our cornerstones. After
                        quite a few sales and rental transactions, we will be
                        happy to make the process of buying and renting a
                        property easier for you after a thorough understanding
                        of your needs. The sale of your property while adjusting
                        the price of the property to the state of the market,
                        property evaluation, and a marketing and advertising
                        strategy developed by our office. In order to maximize
                        the sale, the purchase of the most expensive property
                        for you. Our office also provides services in Russian
                        and English
                    </p>

                    {/* HE */}
                    <h2 className="text-he mb-4 text-2xl text-typo-secondary">
                        מי אנחנו
                    </h2>
                    <p className="text-he text-xl">
                        משרדנו קיים כבר משנת 2015.משרדנו מתמחה בעיקר באזור רמת
                        גן-גבעתיים — במכירה \ והשכרת נכסים חדשים ויד 2.-שיווק
                        פרויקטים-התחדשות עירונית- ניהול נכסים משרדנו שם דגש גדול
                        על אמינות,ישירות,ושקיפות אלו הם אבני הדרך שלנו. אחרי לא
                        מעט עסקאות מכר,שכירות,נשמח להקל לכם את התהליך קניה,השכרה
                        נכס אחרי הבנה מעמיקה של הצרכים שלכם. מכירה הנכס שלכם תוך
                        כדי התאמת מחיר הנכס למצב של השוק,הערכת נכס,ואסטרטגית
                        שיווק ופרסום שפותחה על ידי משרדנו.על מנת למקסם את
                        מכירת,קניית הנכס הכי יקר לכם. משרדנו נותן שירותים גם
                        בשפה הרוסית ואנגלית
                    </p>
                </div>
            </div>
        </>
    );
}

export default memo(About);
