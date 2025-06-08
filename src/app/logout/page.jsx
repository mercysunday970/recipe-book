import { logout } from "./actions";

export default function Page() {
  return (
    <div>
      <form action={logout}>
        <button type="submit">
          Logout
        </button>
      </form>
    </div>
  )
}
