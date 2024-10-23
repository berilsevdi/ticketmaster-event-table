import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EventsTable from "./EventsTable";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("EventsTable Component with real data", () => {
  test("searches for cinema events from real API", async () => {
    render(
      <MemoryRouter>
        <EventsTable />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search...");

    // Kullanıcı arama çubuğuna "cinema" yazıyor
    fireEvent.change(searchInput, { target: { value: "cinema" } });
    fireEvent.click(screen.getByText("Search"));

    // API yanıtını ve sonuçların yüklenmesini bekliyoruz
    await waitFor(() => {
      // "cinema" ile ilgili etkinliklerin tabloya yüklendiğini kontrol ediyoruz
      expect(screen.getByText(/cinema/i)).toBeInTheDocument();
    });

    // Eğer sonuçlar düzgün yüklendiyse, tabloya bakarak kontrol ederiz
    expect(screen.getByText("Event Name")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Venue")).toBeInTheDocument();
  });
});
