import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingStateSkeleton() {
  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="w-full px-8">
        <div className="max-w-3xl space-y-6">
          <section className="space-y-4">
            <Card className="bg-sidebar">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Public Key
                    </Label>
                    <div className="mt-1">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Balance
                    </Label>
                    <div className="mt-1">
                      <Skeleton className="h-8 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
