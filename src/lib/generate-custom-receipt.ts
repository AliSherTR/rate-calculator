import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.vfs;

export const generateCustomRateReceipt = (): void => {
  const region = document.getElementById("regionVal")?.innerText || "";
  const role = document.getElementById("roleVal")?.innerText || "";
  const seniority = document.getElementById("seniorityVal")?.innerText || "";
  const rate = document.getElementById("rateVal")?.innerText || "";
  const date = new Date().toLocaleDateString();
  const receiptId = `#${Math.floor(Math.random() * 100000)}`;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: "Custom Rate Calculator",
        style: "header",
        color: "#7c3aed",
      },
      {
        text: "Region-Based Pricing Model",
        style: "subheader",
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          { text: `Receipt ID: ${receiptId}`, style: "details" },
          {
            text: `Generated on: ${date}`,
            alignment: "right",
            style: "details",
          },
        ],
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
            lineColor: "#cccccc",
          },
        ],
        margin: [0, 10],
      },
      {
        table: {
          widths: ["*", "*"],
          body: [
            ["Region", { text: region, alignment: "right" }],
            ["Role", { text: role, alignment: "right" }],
            ["Seniority", { text: seniority, alignment: "right" }],
          ],
        },
        layout: "noBorders",
        margin: [0, 10],
      },
      {
        text: `Estimated Monthly Rate: AED ${rate}`,
        style: "total",
        margin: [0, 20, 0, 10],
      },
      {
        text: "This receipt was generated using the Custom Rate Calculator. This is not a tax invoice.",
        style: "note",
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 0.5,
            lineColor: "#cccccc",
          },
        ],
        margin: [0, 20],
      },
      {
        text: [
          "This document is created by Rate Calculator. Designed and Developed by ",
          {
            text: "Ali Sher Khan",
            link: "https://www.linkedin.com/in/ali-sher-khan-tahirkheli-26374925b/",
            color: "#1a73e8",
          },
          ".",
        ],
        style: "footer",
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 4],
      },
      subheader: {
        fontSize: 12,
        color: "#666666",
      },
      details: {
        fontSize: 10,
        color: "#888888",
      },
      total: {
        fontSize: 16,
        bold: true,
        color: "#7c3aed", // Purple tone
      },
      note: {
        fontSize: 9,
        color: "#999999",
        alignment: "center",
      },
      footer: {
        fontSize: 9,
        color: "#888888",
        alignment: "center",
      },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };

  pdfMake.createPdf(docDefinition).download("custom-rate-receipt.pdf");
};
