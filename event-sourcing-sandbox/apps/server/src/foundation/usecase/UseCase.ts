export interface UseCase<Req, Res> {
  execute(req: Req): Promise<Res>;
}
