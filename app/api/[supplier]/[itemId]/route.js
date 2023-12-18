import * as supplierFns from "@/lib/supplier";
export async function GET(request, { params }) {
  const { supplier, itemId } = params;

  const { productName, unit, measurements, sizes, sizeChart } =
    await supplierFns[supplier](itemId);

  return Response.json({
    supplier,
    itemId,
    productName,
    unit,
    measurements,
    sizes,
    sizeChart,
  });
}

export const dynamic = "force-dynamic";
