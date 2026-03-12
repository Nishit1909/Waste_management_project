from fastapi import APIRouter, Query, Request

router = APIRouter()


# =====================================================
# 1️⃣ FILTERED WASTE SUMMARY  (USED FOR PIE CHART)
# =====================================================
@router.get("/waste-summary")
async def waste_summary(
    request: Request,
    festival: str | None = Query(None),
    ward: str | None = Query(None),
    year: int | None = Query(None),
):

    pool = request.app.state.pool

    query = """
        SELECT
            SUM(fwd.organic_tons) AS organic,
            SUM(fwd.plastic_tons) AS plastic,
            SUM(fwd.metal_tons) AS metal,
            SUM(fwd.compost_tons) AS compost,
            SUM(fwd.biogas_tons) AS biogas
        FROM festival_waste_data fwd
        JOIN wards w ON w.ward_id = fwd.ward_id
        JOIN festivals f ON f.festival_id = fwd.festival_id
        WHERE 1=1
    """

    params = []
    i = 1

    if festival:
        query += f" AND f.festival_name = ${i}"
        params.append(festival)
        i += 1

    if ward:
        query += f" AND w.ward_name = ${i}"
        params.append(ward)
        i += 1

    if year:
        query += f" AND fwd.year = ${i}"
        params.append(year)

    async with pool.acquire() as conn:
        row = await conn.fetchrow(query, *params)

    organic = row["organic"] or 0
    plastic = row["plastic"] or 0
    metal = row["metal"] or 0
    compost = row["compost"] or 0
    biogas = row["biogas"] or 0

    return {
        "organic": float(organic),
        "plastic": float(plastic),
        "metal": float(metal),
        "total": float(organic + plastic + metal),
        "compost": float(compost),
        "biogas": float(biogas),
    }


# =====================================================
# 2️⃣ DASHBOARD YEARLY DATA (USED FOR GRAPHS)
# =====================================================
@router.get("/dashboard/yearly")
async def yearly_dashboard(request: Request):

    pool = request.app.state.pool

    query = """
        SELECT
            fwd.year,
            SUM(fwd.organic_tons) AS organic,
            SUM(fwd.plastic_tons) AS plastic,
            SUM(fwd.metal_tons) AS metal,
            SUM(fwd.compost_tons) AS compost,
            SUM(fwd.biogas_tons) AS biogas
        FROM festival_waste_data fwd
        GROUP BY fwd.year
        ORDER BY fwd.year;
    """

    async with pool.acquire() as conn:
        rows = await conn.fetch(query)

    response = []

    for row in rows:
        organic = row["organic"] or 0
        plastic = row["plastic"] or 0
        metal = row["metal"] or 0

        response.append({
            "year": row["year"],
            "organic": float(organic),
            "plastic": float(plastic),
            "metal": float(metal),
            "total": float(organic + plastic + metal),
            "compost": float(row["compost"] or 0),
            "biogas": float(row["biogas"] or 0),
        })

    return response


# =====================================================
# 3️⃣ AVAILABLE FILTER OPTIONS (FOR DROPDOWNS)
# =====================================================
@router.get("/filters")
async def get_filters(request: Request):

    pool = request.app.state.pool

    async with pool.acquire() as conn:

        festivals = await conn.fetch("""
            SELECT DISTINCT festival_name
            FROM festivals
            ORDER BY festival_name
        """)

        wards = await conn.fetch("""
            SELECT DISTINCT ward_name
            FROM wards
            ORDER BY ward_name
        """)

        years = await conn.fetch("""
            SELECT DISTINCT year
            FROM festival_waste_data
            ORDER BY year
        """)

    return {
        "festivals": [f["festival_name"] for f in festivals],
        "wards": [w["ward_name"] for w in wards],
        "years": [y["year"] for y in years],
    }