import nodemailer from "nodemailer";
export const forgetPasswordEmailTemplate = (resetUrl, name) => {
  return `
        <!doctype html>
        <html
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        lang="en"
        >
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                padding: 0;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }

            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }

            p {
                line-height: inherit;
            }

            .desktop_hide,
            .desktop_hide table {
                display: none;
                max-height: 0px;
                overflow: hidden;
            }

            .image_block img + div {
                display: none;
            }

            sup,
            sub {
                font-size: 75%;
                line-height: 0;
            }

            @media (max-width: 620px) {
                .desktop_hide table.icons-inner,
                .social_block.desktop_hide .social-table {
                display: inline-block !important;
                }

                .icons-inner {
                text-align: center;
                }

                .icons-inner td {
                margin: 0 auto;
                }

                .mobile_hide {
                display: none;
                }

                .row-content {
                width: 100% !important;
                }

                .stack .column {
                width: 100%;
                display: block;
                }

                .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
                }

                .desktop_hide,
                .desktop_hide table {
                display: table !important;
                max-height: none !important;
                }
            }
            </style>
        </head>

        <body
            class="body"
            style="
            margin: 0;
            background-color: #091548;
            padding: 0;
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
            "
        >
            <table
            class="nl-container"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
                background-color: #091548;
            "
            >
            <tbody>
                <tr>
                <td>
                    <table
                    class="row row-1"
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                        background-color: #091548;
                        background-image: url(&quot;https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3986/background_2.png&quot;);
                        background-position: center top;
                        background-repeat: repeat;
                    "
                    >
                    <tbody>
                        <tr>
                        <td>
                            <table
                            class="row-content stack"
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                                color: #000000;
                                width: 600px;
                                margin: 0 auto;
                            "
                            width="600"
                            >
                            <tbody>
                                <tr>
                                <td
                                    class="column column-1"
                                    width="100%"
                                    style="
                                    
                                    font-weight: 400;
                                    text-align: left;
                                    padding-bottom: 15px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 5px;
                                    vertical-align: top;
                                    "
                                >
                                    <div
                                    class="spacer_block block-1"
                                    style="
                                        height: 8px;
                                        line-height: 8px;
                                        font-size: 1px;
                                    "
                                    >
                                    &#8202;
                                    </div>
                                    <table
                                    class="image_block block-2"
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    >
                                    <tr>
                                        <td
                                        class="pad"
                                        style="
                                            width: 100%;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                        "
                                        >
                                        <div class="alignment" align="center">
                                            <div style="max-width: 232px">
                                            <img
                                                src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3986/header3.png"
                                                style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 100%;
                                                "
                                                width="232"
                                                alt="Main Image"
                                                title="Main Image"
                                                height="auto"
                                            />
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="paragraph_block block-3"
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                        word-break: break-word;
                                    "
                                    >
                                    <tr>
                                        <td
                                        class="pad"
                                        style="
                                            padding-bottom: 15px;
                                            padding-top: 10px;
                                        "
                                        >
                                        <div
                                            style="
                                            color: #ffffff;
                                            font-family:
                                                &quot;Varela Round&quot;,
                                                &quot;Trebuchet MS&quot;, Helvetica,
                                                sans-serif;
                                            font-size: 30px;
                                            line-height: 1.2;
                                            text-align: center;
                                            "
                                        >
                                            <p
                                            style="margin: 0; word-break: break-word"
                                            >
                                            <span style="word-break: break-word"
                                                >Your Reset Password Link</span
                                            >
                                            </p>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="paragraph_block block-4"
                                    width="100%"
                                    border="0"
                                    cellpadding="5"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                        
                                        
                                        word-break: break-word;
                                    "
                                    >
                                    <tr>
                                        <td class="pad">
                                        <div
                                            style="
                                            color: #ffffff;
                                            font-family:
                                                &quot;Varela Round&quot;,
                                                &quot;Trebuchet MS&quot;, Helvetica,
                                                sans-serif;
                                            font-size: 14px;
                                            line-height: 1.5;
                                            text-align: center;
                                            
                                            "
                                        >
                                            <p
                                            style="margin: 0; word-break: break-word"
                                            >
                                            Hi ${name}, We received a request to reset your
                                            password. Don’t worry,
                                            </p>
                                            <p
                                            style="margin: 0; word-break: break-word"
                                            >
                                            we are here to help you.
                                            </p>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="button_block block-5"
                                    width="100%"
                                    border="0"
                                    cellpadding="10"
                                    cellspacing="0"
                                    role="presentation"
                                    >
                                    <tr>
                                        <td class="pad">
                                        <div class="alignment" align="center"><span
                                            class="button"
                                            style="
                                                background-color: #1b045b;
                                                border-bottom: 0px solid transparent;
                                                border-left: 0px solid transparent;
                                                border-radius: 4px;
                                                border-right: 0px solid transparent;
                                                border-top: 0px solid transparent;
                                                color: #ffffff;
                                                display: inline-block;
                                                font-family:
                                                &quot;Varela Round&quot;,
                                                &quot;Trebuchet MS&quot;, Helvetica,
                                                sans-serif;
                                                font-size: 16px;
                                                font-weight: 400;
                                                padding-bottom: 5px;
                                                padding-top: 5px;
                                                padding-left: 20px;
                                                padding-right: 20px;
                                                text-align: center;
                                                width: auto;
                                                word-break: keep-all;
                                                letter-spacing: normal;
                                            "
                                            ><a
                                                href="${resetUrl}"
                                                style="
                                                word-break: break-word;
                                                line-height: 32px;
                                                color: #ffffff;
                                                text-decoration: none;
                                                "
                                                >Reset Password</a
                                            ></span
                                            >
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="divider_block block-6"
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    >
                                    <tr>
                                        <td
                                        class="pad"
                                        style="
                                            padding-bottom: 15px;
                                            padding-left: 10px;
                                            padding-right: 10px;
                                            padding-top: 10px;
                                        "
                                        >
                                        <div class="alignment" align="center">
                                            <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            width="60%"
                                            >
                                            <tr>
                                                <td
                                                class="divider_inner"
                                                style="
                                                    font-size: 1px;
                                                    line-height: 1px;
                                                    border-top: 1px solid #5a6ba8;
                                                "
                                                >
                                                <span style="word-break: break-word"
                                                    >&#8202;</span
                                                >
                                                </td>
                                            </tr>
                                            </table>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="paragraph_block block-7"
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                        
                                        
                                        word-break: break-word;
                                    "
                                    >
                                    <tr>
                                        <td
                                        class="pad"
                                        style="
                                            padding-bottom: 10px;
                                            padding-left: 25px;
                                            padding-right: 25px;
                                            padding-top: 10px;
                                        "
                                        >
                                        <div
                                            style="
                                            color: #7f96ef;
                                            font-family:
                                                &quot;Varela Round&quot;,
                                                &quot;Trebuchet MS&quot;, Helvetica,
                                                sans-serif;
                                            font-size: 14px;
                                            line-height: 1.5;
                                            text-align: center;
                                            
                                            "
                                        >
                                            <p
                                            style="margin: 0; word-break: break-word"
                                            >
                                            <strong
                                                >Didn’t request a password
                                                reset?</strong
                                            >
                                            </p>
                                            <p
                                            style="margin: 0; word-break: break-word"
                                            >
                                            You can safely ignore this message.
                                            </p>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <div
                                    class="spacer_block block-8"
                                    style="
                                        height: 30px;
                                        line-height: 30px;
                                        font-size: 1px;
                                    "
                                    >
                                    &#8202;
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <table
                    class="row row-2"
                    align="center"
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    >
                    <tbody>
                        <tr>
                        <td>
                            <table
                            class="row-content stack"
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                                color: #000000;
                                width: 600px;
                                margin: 0 auto;
                            "
                            width="600"
                            >
                            <tbody>
                                <tr>
                                <td
                                    class="column column-1"
                                    width="100%"
                                    style="                              
                                    font-weight: 400;
                                    text-align: left;
                                    padding-bottom: 15px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 15px;
                                    vertical-align: top;
                                    "
                                >
                                    <table
                                    class="image_block block-1"
                                    width="100%"
                                    border="0"
                                    cellpadding="5"
                                    cellspacing="0"
                                    role="presentation"
                                    >
                                    <tr>
                                        <td class="pad">
                                        <div class="alignment" align="center">
                                            <div style="max-width: 145px">
                                            <img
                                                src="https://res.cloudinary.com/dkicjqsqn/image/upload/v1771515656/TrackDeck/logo/logo_hcharh.png"
                                                style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 100%;
                                                "
                                                width="145"
                                                alt="Your Logo"
                                                title="Your Logo"
                                                height="auto"
                                            />
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="divider_block block-2"
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    >
                                    <tr>
                                        <td
                                        class="pad"
                                        style="
                                            padding-bottom: 15px;
                                            padding-left: 10px;
                                            padding-right: 10px;
                                            padding-top: 15px;
                                        "
                                        >
                                        <div class="alignment" align="center">
                                            <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            width="60%"
                                            >
                                            <tr>
                                                <td
                                                class="divider_inner"
                                                style="
                                                    font-size: 1px;
                                                    line-height: 1px;
                                                    border-top: 1px solid #5a6ba8;
                                                "
                                                >
                                                <span style="word-break: break-word"
                                                    >&#8202;</span
                                                >
                                                </td>
                                            </tr>
                                            </table>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="social_block block-3"
                                    width="100%"
                                    border="0"
                                    cellpadding="10"
                                    cellspacing="0"
                                    role="presentation"
                                    >
                                    <tr>
                                        <td class="pad">
                                        <div class="alignment" align="center">
                                            <table
                                            class="social-table"
                                            width="136px"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                                
                                                
                                                display: inline-block;
                                            "
                                            >
                                            <tr>
                                                <td style="padding: 0 10px 0 0">
                                                <a
                                                    href="https://www.facebook.com"
                                                    target="_blank"
                                                    ><img
                                                    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/facebook@2x.png"
                                                    width="32"
                                                    height="auto"
                                                    alt="Facebook"
                                                    title="Facebook"
                                                    style="
                                                        display: block;
                                                        height: auto;
                                                        border: 0;
                                                    "
                                                /></a>
                                                </td>
                                                <td style="padding: 0 10px 0 10px">
                                                <a
                                                    href="https://www.instagram.com"
                                                    target="_blank"
                                                    ><img
                                                    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/instagram@2x.png"
                                                    width="32"
                                                    height="auto"
                                                    alt="Instagram"
                                                    title="Instagram"
                                                    style="
                                                        display: block;
                                                        height: auto;
                                                        border: 0;
                                                    "
                                                /></a>
                                                </td>
                                                <td style="padding: 0 0 0 10px">
                                                <a
                                                    href="https://www.twitter.com"
                                                    target="_blank"
                                                    ><img
                                                    src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-outline-circle-white/twitter@2x.png"
                                                    width="32"
                                                    height="auto"
                                                    alt="Twitter"
                                                    title="Twitter"
                                                    style="
                                                        display: block;
                                                        height: auto;
                                                        border: 0;
                                                    "
                                                /></a>
                                                </td>
                                            </tr>
                                            </table>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="paragraph_block block-4"
                                    width="100%"
                                    border="0"
                                    cellpadding="15"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                        
                                        
                                        word-break: break-word;
                                    "
                                    >
                                    <tr>
                                        <td class="pad">
                                        <div
                                            style="
                                            color: #4a60bb;
                                            font-family:
                                                &quot;Varela Round&quot;,
                                                &quot;Trebuchet MS&quot;, Helvetica,
                                                sans-serif;
                                            font-size: 12px;
                                            line-height: 1.2;
                                            text-align: center;
                                            "
                                        >
                                            <p
                                            style="margin: 0; word-break: break-word"
                                            >
                                            <span style="word-break: break-word"
                                                >Copyright © ${new Date().getFullYear()} Trackdeck, All rights
                                                reserved.
                                            </p>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                    <table
                                    class="html_block block-5"
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    >
                                    <tr>
                                        <td class="pad">
                                        <div
                                            style="
                                            font-family:
                                                &quot;Varela Round&quot;,
                                                &quot;Trebuchet MS&quot;, Helvetica,
                                                sans-serif;
                                            text-align: center;
                                            "
                                            align="center"
                                        >
                                            <div>&nbsp;</div>
                                        </div>
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
        </body>
        </html>
    `;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export const sendEmail = async ({ to, subject, html, text }) => {
  if (!to || !subject || !html) {
    throw new Error("Missing required email fields");
  }

  try {
    const info = await transporter.sendMail({
      from: `"Trackdeck" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || "Please view this email in an HTML-supported client.",
    });

    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Failed to send email");
  }
};
