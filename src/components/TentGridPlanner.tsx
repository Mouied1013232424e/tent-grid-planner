import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const TentGridPlanner = () => {
  const TENT_SIZE = 20; // 20x20 feet
  const SCALE = 8; // pixels per foot for visualization
  const POLE_RADIUS = 3;
  const TABLE_DIAMETER = 6; // 72 inches = 6 feet

  // Calculate dimensions in pixels
  const tentPixels = TENT_SIZE * SCALE;
  const totalWidth = tentPixels * 2;
  const totalHeight = tentPixels * 2;
  const tableRadius = (TABLE_DIAMETER * SCALE) / 2;

  // Pole positions (3x3 grid for 2x2 tent arrangement)
  const poles = [
    { x: 0, y: 0 }, { x: tentPixels, y: 0 }, { x: totalWidth, y: 0 },
    { x: 0, y: tentPixels }, { x: tentPixels, y: tentPixels }, { x: totalWidth, y: tentPixels },
    { x: 0, y: totalHeight }, { x: tentPixels, y: totalHeight }, { x: totalWidth, y: totalHeight }
  ];

  // Tent boundaries
  const tents = [
    { x: 0, y: 0, label: "Tent 1" },
    { x: tentPixels, y: 0, label: "Tent 2" },
    { x: 0, y: tentPixels, label: "Tent 3" },
    { x: tentPixels, y: tentPixels, label: "Tent 4" }
  ];

  // Optimal table positions (centered in each tent with clearance)
  const tables = tents.map((tent, index) => ({
    x: tent.x + tentPixels / 2,
    y: tent.y + tentPixels / 2,
    id: index + 1
  }));

  // Check if tables fit with clearance
  const clearanceNeeded = 3; // 3 feet clearance around table
  const totalTableSpace = TABLE_DIAMETER + (clearanceNeeded * 2);
  const tablesFit = totalTableSpace <= TENT_SIZE;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagram */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Tent Layout Diagram
              <Badge variant={tablesFit ? "default" : "destructive"}>
                {tablesFit ? "✓ Tables Fit" : "✗ Tables Don't Fit"}
              </Badge>
            </CardTitle>
            <CardDescription>
              4 × 20×20ft tents arranged in 40×40ft configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border">
              <svg 
                viewBox={`-20 -20 ${totalWidth + 40} ${totalHeight + 40}`}
                className="w-full h-auto max-w-lg mx-auto"
              >
                {/* Grid lines for measurement */}
                <defs>
                  <pattern id="grid" width={SCALE * 5} height={SCALE * 5} patternUnits="userSpaceOnUse">
                    <path d={`M ${SCALE * 5} 0 L 0 0 0 ${SCALE * 5}`} fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect x={-10} y={-10} width={totalWidth + 20} height={totalHeight + 20} fill="url(#grid)" />
                
                {/* Tent boundaries */}
                {tents.map((tent, index) => (
                  <g key={index}>
                    <rect
                      x={tent.x}
                      y={tent.y}
                      width={tentPixels}
                      height={tentPixels}
                      fill="rgba(59, 130, 246, 0.1)"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <text
                      x={tent.x + tentPixels / 2}
                      y={tent.y + 20}
                      textAnchor="middle"
                      className="fill-primary font-semibold text-sm"
                    >
                      {tent.label}
                    </text>
                    <text
                      x={tent.x + tentPixels / 2}
                      y={tent.y + 35}
                      textAnchor="middle"
                      className="fill-muted-foreground text-xs"
                    >
                      20×20ft
                    </text>
                  </g>
                ))}

                {/* Poles */}
                {poles.map((pole, index) => (
                  <g key={index}>
                    <circle
                      cx={pole.x}
                      cy={pole.y}
                      r={POLE_RADIUS}
                      fill="#dc2626"
                      stroke="#991b1b"
                      strokeWidth="1"
                    />
                    <circle
                      cx={pole.x}
                      cy={pole.y}
                      r={POLE_RADIUS + 2}
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </g>
                ))}

                {/* Round tables */}
                {tables.map((table) => (
                  <g key={table.id}>
                    <circle
                      cx={table.x}
                      cy={table.y}
                      r={tableRadius}
                      fill="rgba(34, 197, 94, 0.2)"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />
                    <text
                      x={table.x}
                      y={table.y}
                      textAnchor="middle"
                      className="fill-green-700 dark:fill-green-300 font-medium text-xs"
                      dy="0.35em"
                    >
                      Table {table.id}
                    </text>
                    <text
                      x={table.x}
                      y={table.y + 12}
                      textAnchor="middle"
                      className="fill-green-600 dark:fill-green-400 text-xs"
                    >
                      72" ⌀
                    </text>
                  </g>
                ))}

                {/* Measurements */}
                <g className="text-xs fill-muted-foreground">
                  {/* Top measurement */}
                  <line x1={0} y1={-10} x2={totalWidth} y2={-10} stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)"/>
                  <text x={totalWidth / 2} y={-15} textAnchor="middle">40ft</text>
                  
                  {/* Side measurement */}
                  <line x1={-10} y1={0} x2={-10} y2={totalHeight} stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)"/>
                  <text x={-15} y={totalHeight / 2} textAnchor="middle" transform={`rotate(-90, -15, ${totalHeight / 2})`}>40ft</text>
                </g>

                {/* Arrow markers */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                  </marker>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Layout Specifications</CardTitle>
            <CardDescription>Detailed measurements and fit analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">TENT CONFIGURATION</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Individual tent:</span>
                    <Badge variant="outline">20×20 ft</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total coverage:</span>
                    <Badge variant="outline">40×40 ft</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total area:</span>
                    <Badge variant="outline">1,600 ft²</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">POLE LAYOUT</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Total poles:</span>
                    <Badge variant="secondary">9 poles</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Shared poles:</span>
                    <Badge variant="secondary">7 shared</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pattern:</span>
                    <Badge variant="secondary">3×3 grid</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">TABLE FIT ANALYSIS</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Table diameter:</span>
                  <Badge variant="outline">72 inches (6 ft)</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Required clearance:</span>
                  <Badge variant="outline">3 ft minimum</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total space needed:</span>
                  <Badge variant="outline">12 ft × 12 ft</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Fit status:</span>
                  <Badge variant={tablesFit ? "default" : "destructive"} className="font-medium">
                    {tablesFit ? "✓ FITS COMFORTABLY" : "✗ INSUFFICIENT SPACE"}
                  </Badge>
                </div>
                {tablesFit && (
                  <div className="flex justify-between">
                    <span className="text-sm">Extra clearance:</span>
                    <Badge variant="secondary">{TENT_SIZE - totalTableSpace} ft per side</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Recommendation:</span> Each 20×20ft tent can comfortably accommodate 
                one 72" round table with {TENT_SIZE - totalTableSpace}ft of clearance on all sides.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-dashed bg-blue-100 dark:bg-blue-900/20"></div>
              <span className="text-sm">Tent boundary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-sm">Tent poles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-500 bg-green-200 dark:bg-green-900/20 rounded-full"></div>
              <span className="text-sm">72" round tables</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-gray-400"></div>
              <span className="text-sm">Measurements</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};